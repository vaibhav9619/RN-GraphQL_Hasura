import React, { useEffect, useState } from 'react'
import { Button, FlatList, SafeAreaView, Text } from 'react-native'
import { useQuery, useMutation,useSubscription } from '@apollo/react-hooks'
import { getDetailsQuery, insertDetailQuery,removeQuery,subscription } from '../query'
import { makeApolloClient } from '../graphQlUrl'
const MainApp = () => {
    const [dataid, setDataid] = useState([''])
    const [name, setName] = useState('hello')
    const [surname, setSurname] = useState('ok')
    const [phone, setPhone] = useState(9650953891)
    const [studentId,setStudentId] = useState(64)
    const { data, error, loading } = useQuery(getDetailsQuery);
    const [insertTodo, mutationVar] = useMutation(insertDetailQuery)
    const [deleteTodo,{loading:deleting,error:deleteError}] = useMutation(removeQuery)
    const subscriptionData = useSubscription(subscription) 
    console.log(subscriptionData.data && subscriptionData.data.student)
    
    // get data 
    const callAPI = () => {
        console.log(data && data.student)
        setDataid(data && data.student)
    }
    // insert data into table
    const addDetails = () => {
        insertTodo({
            variables: {
                name, surname, phone,
            },
            update:updateCache
        })
    }


    // update cache to update UI
    const updateCache = (makeApolloClient, { data: { insert_student } }) => {
        //It will always read from the cache.
        const data = makeApolloClient.readQuery({
            query: getDetailsQuery
        })
        const newEntry = insert_student.returning[0]
        const newData = {
            student: [newEntry, ...data.student]
        }
        //This is where writeQuery comes to the rescue. writeQuery will allow you to change data in your local cache
        makeApolloClient.writeQuery({
            query:getDetailsQuery,
            data:newData
        })
        setDataid(newData.student)
    }


        //we will also write an updateCache function that we will remove this todo from the UI cache.
    const removeCache= (makeApolloClient)=>{
        const data = makeApolloClient.readQuery({
            query:getDetailsQuery,
        })
        const newData = {
            student:data.student.filter((t)=>t.id !== studentId )
        }
        makeApolloClient.writeQuery({
            query:getDetailsQuery,
            data:newData
        })
        console.log('neweee',newData)
        setDataid(newData.student)
    }

    const remove = ()=>{
            deleteTodo({
                variables:{id:studentId},
                update:removeCache
            })
    }
    const renderItem = ({ item, index }) => {
        return (
            <Text>{item.firstName} {item.lastName} {item.phoneNo}.</Text>
        )
    }

    const subscriptionAPI = ()=>{
        setDataid(subscriptionData.data && subscriptionData.data.student)
    }
    return (
        <SafeAreaView>
            <Button onPress={() => {
                callAPI()
            }} title='Get'
            />
            <Button onPress={() => {
                addDetails()
            }} title='Post'
            />
            <Button onPress={() => {
                remove()
            }} title='Delete'
            />
            <Button onPress={() => {
                subscriptionAPI()
            }} title='Subscription'
            />
            <FlatList
                data={dataid}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView>
    )
}
export default MainApp;