import { Layout } from '@/components/Layout'
import Map from '@/components/Map'
import React from 'react'
import SocketService from '@/components/socketService'

export default function index(): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks


    return (
        <Layout>
            <Map />
            <SocketService />
        </Layout>
    )
}