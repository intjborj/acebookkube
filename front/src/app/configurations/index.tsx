import { Tickets } from '@/components/icons/category'
import Card from '@/components/ui/cards/card'
import Link from 'next/link'
import React from 'react'
import FucntionRestriction from '../restrictions/system/function'

type Props = {}

const Configs = (props: Props) => {
    return (
        <>
            {/* <div className='flex justify-center'>
             <div className='w-3/6'>
                <div className=''> */}

            {/* <div className='w-full'> */}
            <div className='flex justify-center'>
                <div className='w-full md:w-3/6'>
                    <FucntionRestriction code='CONFIG_TICKET_TYPE_PAGE'>
                        <Link href={'/tickets/types'}>
                            <Card className='w-full md:w-full cursor-pointer flex mb-2'>
                                <Tickets />
                                <span className='pl-5'> Ticket Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_FEEDBACK_QA_PAGE'>
                        <Link href={'/feedback/categories'}>
                            <Card className='w-full md:w-full cursor-pointer flex  mb-2'>
                                <Tickets />
                                <span className='pl-5'> Feedback Question Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                    <FucntionRestriction code='CONFIG_INVESTORS_PAGE'>
                        <Link href={'/investors/configuration'}>
                            <Card className='w-full md:w-full cursor-pointer flex'>
                                <Tickets />
                                <span className='pl-5'>Investors Settings </span>
                            </Card>
                        </Link>
                    </FucntionRestriction>
                </div>
            </div>

            {/* </div>
             </div>
         </div> */}
        </>
    )
}

export default Configs