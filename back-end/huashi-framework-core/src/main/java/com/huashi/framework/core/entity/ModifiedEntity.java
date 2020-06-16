package com.huashi.framework.core.entity;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public class ModifiedEntity<I extends Serializable> extends BaseEntity<I> {

    private static final long serialVersionUID = 5331070750058990002L;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDatetime;
    //是否激活
    private Boolean activeFlag = true;
    //是否删除
    private Boolean deletedFlag = false;

    public Date getUpdateDatetime() {
        return updateDatetime;
    }

    public void setUpdateDatetime(Date updateDatetime) {
        this.updateDatetime = updateDatetime;
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
