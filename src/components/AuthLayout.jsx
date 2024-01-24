import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({children, authentication = true}) => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // TODO: make it more east to understand
        // if (authStatus === true) {
        //     navigate('/')
        // } else if (authStatus === false){
        //     navigate('/login')
        // }

        if(authentication && authStatus !== authentication){
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return (
    <div>
        {loader ? <h1>Loading</h1> : <>{children}</>}
    </div>
  )
}

export default Protected
