import _ from "lodash"

export const accFormDefaultValue = (data: any) =>{

    let payload = _.cloneDeep(_.get(data, "accounts.data[0]"))

    let refRestriction = _.get(data, "accounts.data[0].restrictionCode").map((item: string) => {
      return { code: item}
    })

    payload.restrictionCode = refRestriction

    payload.blocks = _.get(payload, "investorDetails.blocks")
    payload.isEmployee = _.get(payload, "investorDetails.isEmployee")
    payload.investorId = _.get(payload, "investorDetails.investorId")

    return payload

}