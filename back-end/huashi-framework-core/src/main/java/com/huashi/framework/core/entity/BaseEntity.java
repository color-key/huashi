package com.huashi.framework.core.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 所有实体类的基础类
 * @author xiaoyu
 * @data 2020/5/31.
 */
@MappedSuperclass
public class BaseEntity<I extends Serializable> implements Serializable{

    private static final long serialVersionUID = 1757956305662057086L;

    @Id
    private I id;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable=false)
    private Date creationDatetime;


    public I getId() {
        return id;
    }

    public void setId(I id) {
        this.id = id;
    }

    public Date getCreationDatetime() {
        return creationDatetime;
    }

    public void setCreationDatetime(Date creationDatetime) {
        this.creationDatetime = creationDatetime;
    }
}
