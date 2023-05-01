import { Layout } from '@/components/Layout'
import { ITestCom, TestCom } from '@/components/TestCom'
import React, { useState } from 'react'
import BottomSheet from '@/components/Bottomsheet'
interface indexProps {
    name: string
}

export default function index({ name }: indexProps): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tests, setTests] = useState<ITestCom[]>([])

    return (
        <Layout>

        </Layout>
    )
}
