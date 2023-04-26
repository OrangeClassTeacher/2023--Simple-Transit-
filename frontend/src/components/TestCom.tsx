import React from 'react'


export interface ITestCom {
    id: number,
    text: string,
    insertAt: Date
}

export const TestCom = ({ tests }: { tests: ITestCom[] }) => {
    return (
        <div>TestCom


            {/* {tests.map} */}
        </div>
    )
}
