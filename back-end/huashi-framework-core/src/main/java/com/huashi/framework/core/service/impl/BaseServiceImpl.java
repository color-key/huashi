package com.huashi.framework.core.service.impl;

//import com.fy.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.converter.BaseConverter;
import com.huashi.framework.core.dao.BaseDAO;
import com.huashi.framework.core.dto.BaseDTO;
import com.huashi.framework.core.entity.BaseEntity;
import com.huashi.framework.core.entity.ModifiedEntity;
//import com.fy.framework.core.idg.IDGenerator;
import com.huashi.framework.core.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
//import java.util.UUID;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public class BaseServiceImpl<T extends BaseEntity<I>,D extends BaseDTO,I extends Serializable,C extends BaseConverter<T,D,I>, DAO extends BaseDAO<T,I>> implements BaseService<T,D,I> {

    @Autowired
    private C converter;
    @Autowired
    private DAO dao;
//    @Autowired
//    private com.garea.gpms.framework.core.cache.Cache cache;
//    @Autowired
//    private IDGenerator idg;

    private Class<T> clazz;
    private Class<I> iclazz;

    public BaseServiceImpl(){
        Type genType = getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType)genType).getActualTypeArguments();
        clazz = (Class<T>)params[0];
        iclazz = (Class<I>)params[1];
    }

    @Override
    public T saveOrUpdate(T entity) {
//        if(entity.getId()==null){
//            if(iclazz.getSimpleName().equals("Integer") || iclazz.getSimpleName().equals("Long")){
//                IDGeneratorTable idgTable = clazz.getAnnotation(IDGeneratorTable.class);
//                entity.setId((I) idg.generatorID(idgTable.table()));
//
//            }else if(iclazz.getSimpleName().equals("String")){
//                entity.setId((I) UUID.randomUUID().toString().replaceAll("-", ""));
//            }
//        }

        if (entity.getCreationDatetime() == null) {
            entity.setCreationDatetime(new Date());
        } else if (entity instanceof ModifiedEntity<?>) {
            ((ModifiedEntity) entity).setUpdateDatetime(new Date());
        }
        T result = dao.save(entity);

        return result;
    }

    @Override
    public void delete(I id) {
        dao.deleteById(id);
    }

    @Override
    public T get(I id) {
//        return dao.findOne(id);
        return dao.findById(id).get();
    }

    @Override
    public D findOne(I id) {
        return converter.toDTO(dao.findById(id).get());
    }

    @Override
    public List<D> findAll() {
        return converter.toDTOList(dao.findAll());
    }

    public DAO getDAO() {
        return dao;
    }
}
