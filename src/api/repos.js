import {
  getSecureObject
} from '../utils/handleStorage'

export const fetch_repo_commits = async (params) => {
  console.log('params', params)
  try {
    const { accessToken } = await getSecureObject('github_access_token')
    // https://api.github.com/repos/octocat/hello-world/commits
    return await fetch(`https://api.github.com/repos/${params.owner_n_repo}/commits?per_page=${params.per_page}&page=${params.page}`,{
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        Authorization: accessToken, 
      },
    })
  } catch (error) {
    return error
  }
  
}