package com.huashi.framework.core.dao;

import com.huashi.framework.core.entity.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@NoRepositoryBean
public interface BaseDAO<T extends BaseEntity<I>, I extends Serializable> extends JpaRepository<T,I> {
}
