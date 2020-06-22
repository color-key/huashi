package com.huashi.dto;

import com.huashi.framework.core.dto.BaseDTO;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class OrderDTO extends BaseDTO {
    /**
     * 订单编号
     */
    private String orderNo;
    private String openId;
    /**
     * 客户名字
     */
    private String userName;
    /**
     * 订单状态
     */
    private String suatus;
    /**
     * 镜框型号
     */
    private String frameModel;
    /**
     * 色号
     */
    private String colorNo;
    /**
     * 备注
     */
    private String remark;

    private List<ShoppingCartDTO> scList;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSuatus() {
        return suatus;
    }

    public void setSuatus(String suatus) {
        this.suatus = suatus;
    }

    public String getFrameModel() {
        return frameModel;
    }

    public void setFrameModel(String frameModel) {
        this.frameModel = frameModel;
    }

    public String getColorNo() {
        return colorNo;
    }

    public void setColorNo(String colorNo) {
        this.colorNo = colorNo;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<ShoppingCartDTO> getScList() {
        return scList;
    }

    public void setScList(List<ShoppingCartDTO> scList) {
        this.scList = scList;
    }
}
