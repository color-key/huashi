package com.huashi.framework.core.service;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface BaseService<T, D, I> {

    /**
     * Save or update a entity
     * @param entity
     */
    public T saveOrUpdate(T entity);
    /**
     * Delete a entity by given id.
     * @param id
     */
    public void delete(I id);
    /**
     * Get a entity by given id.
     * @param id
     * @return T extends BaseEntity
     */
    public T get(I id);
    /**
     * Get a D by given id.
     * @param id
     * @return D
     */
    public D findOne(I id);

    /**
     * Find all D.
     * @return List<T extends BaseEntity>
     */
    public List<D> findAll();

}
