import {gql, useQuery} from '@apollo/client';


export const GET_ALL_ACCS = gql`
query Accounts($first: Int, $page: Int, $type: String) {
  accounts(first: $first, page: $page,  type: $type) {
    data {
      _id
      username
      firstName
      middleName
      lastName
      departmentOnDuty {
        name
        _id
      }
      investorDetails{
        isEmployee
        blocks
        investorId
      }
      suffix
    }
    paginatorInfo {
      count
      currentPage
      firstItem
      lastItem
      lastPage
      perPage
      total
      hasMorePages
    }
  }
}
`

export const GET_DETAILED_ACC = gql`
query Accounts($first: Int, $page: Int, $id: String, $type: String) {
  accounts(first: $first, page: $page, id: $id, type: $type) {
    data {
      _id
      created_at
      updated_at
      suffix
      username
      firstName
      middleName
      lastName
      position
      isActive
      isApprover
      contact
      email
      token
      departmentOnDuty {
        _id
        created_at
        updated_at
        name
        description
      }
      department {
        _id
        created_at
        updated_at
        name
        description
      }
      restrictionCode
      investorDetails{
        isEmployee
        blocks
        investorId
      }
      nameExtension
    }
    paginatorInfo {
      count
      currentPage
      firstItem
      lastItem
      lastPage
      perPage
      total
      hasMorePages
    }
  }
}
`


export const SEARCH_ACCS = gql`
query Search_accounts($name: String) {
  search_accounts(name: $name) {
    data {
      firstName
      middleName
      lastName
      _id
      departmentOnDuty {
        _id
        name
      }
    }
  }
}
`


