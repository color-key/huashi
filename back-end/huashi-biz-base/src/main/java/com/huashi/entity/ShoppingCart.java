package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 购物车
 * @author xiaoyu
 * @data 2020/6/19.
 */
@IDGeneratorTable(table = "shopping_cart")
@Entity
@Table
public class ShoppingCart extends ModifiedEntity<Long> {

    private static final long serialVersionUID = 4914519596364949107L;
    /**
     * 微信用户
     */
    private String wxUserId;
    /**
     * 订单编号
     */
    private String orderNo;
    /**
     * 客户姓名
     */
    private String name;
    /**
     * 性别
     * (0-男，1-女，2-未知)
     */
    private Integer gender;
    /**
     * 手机号后四位
     */
    private String mobile;
    /**
     * 镜框型号
     */
    private String frameModel;
    /**
     * 瞳距
     */
    private String interpupillaryDistance;
    /**
     * 柱镜(右眼)
     */
    private String cylMirrorRight;
    /**
     * 棱镜(右眼)
     */
    private String prismRight;
    /**
     * 轴向(右眼)
     */
    private String axialRight;
    /**
     * 点瞳(右眼)
     */
    private String pointPupilRight;
    /**
     * 柱镜(左眼)
     */
    private String cylMirrorLeft;
    /**
     * 棱镜(左眼)
     */
    private String prismLeft;
    /**
     * 轴向(左眼)
     */
    private String axialLeft;
    /**
     * 点瞳(左眼)
     */
    private String pointPupilLeft;

    public String getWxUserId() {
        return wxUserId;
    }

    public void setWxUserId(String wxUserId) {
        this.wxUserId = wxUserId;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getFrameModel() {
        return frameModel;
    }

    public void setFrameModel(String frameModel) {
        this.frameModel = frameModel;
    }

    public String getInterpupillaryDistance() {
        return interpupillaryDistance;
    }

    public void setInterpupillaryDistance(String interpupillaryDistance) {
        this.interpupillaryDistance = interpupillaryDistance;
    }

    public String getCylMirrorRight() {
        return cylMirrorRight;
    }

    public void setCylMirrorRight(String cylMirrorRight) {
        this.cylMirrorRight = cylMirrorRight;
    }

    public String getPrismRight() {
        return prismRight;
    }

    public void setPrismRight(String prismRight) {
        this.prismRight = prismRight;
    }

    public String getAxialRight() {
        return axialRight;
    }

    public void setAxialRight(String axialRight) {
        this.axialRight = axialRight;
    }

    public String getPointPupilRight() {
        return pointPupilRight;
    }

    public void setPointPupilRight(String pointPupilRight) {
        this.pointPupilRight = pointPupilRight;
    }

    public String getCylMirrorLeft() {
        return cylMirrorLeft;
    }

    public void setCylMirrorLeft(String cylMirrorLeft) {
        this.cylMirrorLeft = cylMirrorLeft;
    }

    public String getPrismLeft() {
        return prismLeft;
    }

    public void setPrismLeft(String prismLeft) {
        this.prismLeft = prismLeft;
    }

    public String getAxialLeft() {
        return axialLeft;
    }

    public void setAxialLeft(String axialLeft) {
        this.axialLeft = axialLeft;
    }

    public String getPointPupilLeft() {
        return pointPupilLeft;
    }

    public void setPointPupilLeft(String pointPupilLeft) {
        this.pointPupilLeft = pointPupilLeft;
    }
}
