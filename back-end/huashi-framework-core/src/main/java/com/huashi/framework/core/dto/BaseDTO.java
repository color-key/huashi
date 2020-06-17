package com.huashi.framework.core.dto;

import com.huashi.framework.core.utils.DatetimeUtil;

import java.io.Serializable;
import java.util.Date;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public class BaseDTO implements Serializable {


    private Long id;
    private Date creationDatetime;
    private String creationDatetimeStr;
    private Date updateDatetime;
    private String updateDatetimeStr;
    private Boolean activeFlag;
    private Boolean deletedFlag;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreationDatetime() {
        return creationDatetime;
    }

    public void setCreationDatetime(Date creationDatetime) {
        this.creationDatetime = creationDatetime;
        if(creationDatetime != null){
            this.creationDatetimeStr = DatetimeUtil.toString(creationDatetime);
        }
    }

    public String getCreationDatetimeStr() {
        return creationDatetimeStr;
    }

    public Date getUpdateDatetime() {
        return updateDatetime;
    }

    public void setUpdateDatetime(Date updateDatetime) {
        this.updateDatetime = updateDatetime;
        if(updateDatetime != null){
            this.updateDatetimeStr = DatetimeUtil.toString(updateDatetime);
        }
    }

    public String getUpdateDatetimeStr() {
        return updateDatetimeStr;
    }

    public Boolean getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
    }

    public Boolean getDeletedFlag() {
        return deletedFlag;
    }

    public void setDeletedFlag(Boolean deletedFlag) {
        this.deletedFlag = deletedFlag;
    }
}
