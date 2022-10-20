import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getAuthCredentials } from "@utils/auth-utils";
import { ALL_RESTRICTIONS } from '../allRestrictions';



type Props = {
    children?: JSX.Element;
    code?: string;
}

const FucntionRestriction = ({ children, code }: Props) => {
    const { asPath, push } = useRouter();
    const [permitted, setPermitted] = useState(true)
    const { token: cookieToken, permissions: cookiePermissions, id: cookieUserId, user: cookieUser } = getAuthCredentials();
    
    useEffect(() => {

        if (code) {
            if (!cookieUser.restrictionCode?.includes(code)) {
                setPermitted(false)
            }
        }else{
            setPermitted(false)
        }

        if (cookieUser.restrictionCode?.includes("ALL_RESTRICTIONS")) {
            setPermitted(true)
        }

    }, [])

    return (
        <>
            {
                permitted ?
                    <>
                        {children}
                    </>
                    : <></>
            }
        </>
    )
}

export default FucntionRestriction