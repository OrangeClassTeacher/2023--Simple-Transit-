import { Layout } from '@/components/Layout'
import { ITestCom, TestCom } from '@/components/TestCom'
import React, { useState } from 'react'

interface indexProps {
    name: string
}

export default function index({ name }: indexProps): JSX.Element {
    const [tests, setTests] = useState<ITestCom[]>([])

    return (
        <Layout>

            <TestCom tests={tests} />
            <div>index</div>
        </Layout>
    )
}
