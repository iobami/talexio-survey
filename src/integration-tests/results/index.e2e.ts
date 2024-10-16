import config from '../../lib/config'
import axios from 'axios'

describe('GET /results/kpis', () => {
  it('should return all groups kpis', async () => {
    const response = await axios.get(config.baseUrl + '/api/results/kpis')

    expect(response.status).toBe(200) // Check if the response status code is 200 (OK)
  })
})
