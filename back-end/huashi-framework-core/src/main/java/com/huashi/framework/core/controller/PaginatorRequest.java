package com.huashi.framework.core.controller;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class PaginatorRequest {
    private int page;
    private int pageSize;
    private int skip;
    private String sortName;
    private String sortType;
    private double lat;
    private double lon;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder()
                .append("page="+page)
                .append("pageSize="+pageSize)
                .append("skip="+skip)
                .append("sortName="+sortName)
                .append("sortType="+sortType);
        return sb.toString();
    }

    public static PaginatorRequest createFirstPageRequest(){
        PaginatorRequest pr = new PaginatorRequest();
        pr.setPage(1);
        pr.setPageSize(20);
        pr.setSkip(0);
        return pr;
    }
}
