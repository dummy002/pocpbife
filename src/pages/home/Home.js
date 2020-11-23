import Axios from 'axios'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models } from 'powerbi-client'
import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { LogoutIcon } from '../../assets'
import { API_URL, ROLES, ROLES_ADMIN } from '../../common/Constants'

const Home = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [response, setResponse] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('username') === null){
            history.push('/login')
        }else{
            getEmbedToken()
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('username')
        history.push('/login')
    }

    const getEmbedToken = async () => {
        setLoading(true)
        try{
            let data = {
                username: localStorage.getItem('username'),
                roles: localStorage.getItem('username') === 'admin' ? ROLES_ADMIN : ROLES
            }
            let response = await Axios.post(API_URL + 'generateToken', data)
            console.log(response)
            setLoading(false)
            setResponse(response)
        }catch(ex){
            console.log(ex.message)
            setLoading(false)
            setError("Something went wrong try refreshing the page")
        }
    }

    return(
        <div className="top-container">
            <div className="navbar">
                <div className="navbar-title">Power BI Embedded Demo</div>
                <div className="navbar-username">
                    {localStorage.getItem('username')} &nbsp;
                    <img onClick={logout} className="logout-icon" src={LogoutIcon} />
                </div>
            </div>
            {!loading && error != '' &&
            <Alert variant="danger">{error}</Alert>}
            <div className="content-container">
                {loading && <Spinner animation="grow" variant="success" className="spinner" />}
                {response != null && 
                <PowerBIEmbed
                    embedConfig = {{
                        type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                        id: 'd531a180-ffda-4d10-9364-3cd68ab06b56',
                        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d531a180-ffda-4d10-9364-3cd68ab06b56&groupId=237e46d7-f81f-4b5b-89f0-42a7bcd3ffee&$filter=DimSales/SalesId eq 2',
                        accessToken: response.data.token,
                        tokenType: models.TokenType.Embed,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                            background: models.BackgroundType.Transparent,
                        }
                    }}
                
                    eventHandlers = { 
                        new Map([
                            ['loaded', function () {console.log('Report loaded');}],
                            ['rendered', function () {console.log('Report rendered');}],
                            ['error', function (event) {console.log(event.detail);}]
                        ])
                    }
                        
                    cssClassName = { "report-style-class" }
                />
                }
            </div>
        </div>
    )
}

export default Home