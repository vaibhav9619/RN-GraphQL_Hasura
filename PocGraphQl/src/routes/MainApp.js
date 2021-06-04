import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { clientQuery } from '../query'
const MainApp =  () => {
    const [dataid,setDataisd]  = useState([''])
    const { data, error, loading } = useQuery(clientQuery);
    const callAPI =  () => {
        console.log(data && data.student)
        setDataisd(data && data.student)
    }
    return (
        <SafeAreaView>
            <Text>Hello World my name is {dataid[0].firstName} {dataid[0].lastName}</Text>
            <Button onPress={() => {
                callAPI()
            }} title='Get'
            />
        </SafeAreaView>
    )
}
export default MainApp;