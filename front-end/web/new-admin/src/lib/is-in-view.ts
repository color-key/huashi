export const isInViewPortOfTwo = (el: any) => {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
    return top  <= viewPortHeight + 100
}