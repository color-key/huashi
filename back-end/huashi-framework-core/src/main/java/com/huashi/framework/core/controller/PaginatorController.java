package com.huashi.framework.core.controller;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public abstract class PaginatorController<T> extends BaseController {
    // default page size
    public final static int PAGE_SIZE = 20;

    protected PaginatorRequest buildPaginatorRequest(HttpServletRequest request){
        PaginatorRequest pr = new PaginatorRequest();
        if(StringUtils.isEmpty(request.getParameter("page"))){
            pr.setPage(1);
        }else{
            pr.setPage(Integer.parseInt(request.getParameter("page")));
        }
        if(StringUtils.isEmpty(request.getParameter("pageSize"))){
            pr.setPageSize(10);
        }else{
            pr.setPageSize(Integer.parseInt(request.getParameter("pageSize")));
        }
        String skip = request.getParameter("skip");

        if(StringUtils.isNotBlank(skip)){
            pr.setSkip(Integer.parseInt(request.getParameter("skip")));
        }else{
            pr.setSkip((pr.getPage()-1)*pr.getPageSize());
        }

        String sortName = request.getParameter("sortName");
        pr.setSortName(sortName);

        if(StringUtils.isNotBlank(sortName)){
            pr.setSortType(request.getParameter("sortType"));
        }
        return pr;
    }

    protected PaginatorResult<T> buildPaginatorResult(List<T> records, long count, PaginatorRequest pr){
        PaginatorResult<T> presult = new PaginatorResult<>();
        presult.setCount(count);
        presult.setRecords(records);
        //calculate the total pages
        int totalPages = (int)(count % pr.getPageSize() > 0 ? (count / pr.getPageSize()+1): count/pr.getPageSize());
        presult.setTotalPages(totalPages);
        return presult;
    }

    protected PaginatorResult<T> buildFailedPaginatorResult(String message){
        PaginatorResult<T> presult = new PaginatorResult<>();
        presult.setMessage(message);
        return presult;
    }

}
