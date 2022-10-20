import { INVESTOR_ACCOUNT_FILTER } from "@/util/constants/investors";
import { GetAccArgs } from "../dto/get-users.args";


export const objectFilterUsers = (args: GetAccArgs) => {


    switch (args.type) {
        case "SPECIFIC_ID":
            if (args.id) {
                return { _id: args.id }
            }
            break;
        case "ACCOUNTS_ACE_EMPLOYEES":
            return {
                $or: [
                    { investorDetails: null},
                    { investorDetails: { $exists: false} },
                    { investorDetails: { $exists: true, $size: 0 } },
                    { investorDetails: { $elemMatch: { 'isEmployee': true } } }
                ]
            }
        case "ACCOUNTS_INVESTORS":
            return INVESTOR_ACCOUNT_FILTER
        default:
            return {}
            break;
    }




}