import {createSelectorQuery} from 'remax/wechat';

export const querySelectorClientRect = (selector: string) => {
  return new Promise<any[]>((resolve) => {
    const query = createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      resolve(res);
    })
  })
}

export const querySelector = (selector: string) => {
  return new Promise<any[]>((resolve) => {
    const query = createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      resolve(res);
    })
  })
}