import superagent, { SuperAgentRequest, Response } from 'superagent';

export class HttpRequest {
  // 发送GET请求
  public async get<T = any>(url: string, params?: any): Promise<T> {
    try {
      const response: Response = await superagent
        .get(url)
        .query(params)
        .set('Content-Type', 'application/json');
      return response.body;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 发送POST请求
  public async post<T = any>(url: string, data?: any): Promise<T> {
    try {
      const response: Response = await superagent
        .post(url)
        .send(data)
        .set('Content-Type', 'application/json');
      return response.body;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 发送PUT请求
  public async put<T = any>(url: string, data?: any): Promise<T> {
    try {
      const response: Response = await superagent
        .put(url)
        .send(data)
        .set('Content-Type', 'application/json');
      return response.body;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 发送DELETE请求
  public async delete<T = any>(url: string, params?: any): Promise<T> {
    try {
      const response: Response = await superagent
        .delete(url)
        .query(params)
        .set('Content-Type', 'application/json');
      return response.body;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 处理错误
  private handleError(error: any): Error {
    if (error.response && error.response.body) {
      return new Error(error.response.body.message || 'Unknown error');
    }
    return new Error(error.message || 'Request failed');
  }
}