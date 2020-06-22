package com.huashi.framework.core.controller;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class PaginatorResult<T> extends AppResult {
    private long count;
    private List<T> records = new ArrayList<T>();
    private int totalPages;
    private String message;

    public PaginatorResult(){

    }

    public PaginatorResult(List<T> records, long count, PaginatorRequest pr){
        int totalPages = (int)(count % pr.getPageSize() > 0 ? (count / pr.getPageSize()+1): count/pr.getPageSize());
        this.records = records;
        this.count = count;
        this.totalPages = totalPages;
    }

    public PaginatorResult(List<T> records, long count, int totalPages){
        this.records = records;
        this.count = count;
        this.totalPages = totalPages;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public void setMessage(String message) {
        this.message = message;
    }
}
