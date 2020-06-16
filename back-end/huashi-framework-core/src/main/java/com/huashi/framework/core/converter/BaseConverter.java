package com.huashi.framework.core.converter;

import com.huashi.framework.core.dto.BaseDTO;
import com.huashi.framework.core.entity.BaseEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public abstract class BaseConverter<T extends BaseEntity<I>,D extends BaseDTO,I extends Serializable> {

    /**
     * Convert an entity to a DTO.
     * @param t
     * @return D extends BaseDTO
     */
    public abstract D toDTO(T t);

    /**
     * Convert a list of entity to a list of DTO.
     * @param entityList
     * @return List<D>
     */
    @SuppressWarnings("unchecked")
    public List<D> toDTOList(List<T> entityList){
        if(entityList!=null && !entityList.isEmpty()){
            List<D> dtoList = new ArrayList<D>();
            for(T t:entityList){
                dtoList.add(toDTO(t));
            }
            return dtoList;
        }
        return Collections.EMPTY_LIST;
    }

}
