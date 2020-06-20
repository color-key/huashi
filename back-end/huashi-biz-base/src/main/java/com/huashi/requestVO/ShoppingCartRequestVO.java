package com.huashi.requestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class ShoppingCartRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = -84884266817628284L;

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
    private Integer interpupillaryDistance;
    /**
     * 柱镜(右眼)
     */
    private Float cylMirrorRight;
    /**
     * 棱镜(右眼)
     */
    private Float prismRight;
    /**
     * 轴向(右眼)
     */
    private Integer axialRight;
    /**
     * 点瞳(右眼)
     */
    private Integer pointPupilRight;
    /**
     * 柱镜(左眼)
     */
    private Float cylMirrorLeft;
    /**
     * 棱镜(左眼)
     */
    private Float prismLeft;
    /**
     * 轴向(左眼)
     */
    private Integer axialLeft;
    /**
     * 点瞳(左眼)
     */
    private Integer pointPupilLeft;

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

    public Integer getInterpupillaryDistance() {
        return interpupillaryDistance;
    }

    public void setInterpupillaryDistance(Integer interpupillaryDistance) {
        this.interpupillaryDistance = interpupillaryDistance;
    }

    public Float getCylMirrorRight() {
        return cylMirrorRight;
    }

    public void setCylMirrorRight(Float cylMirrorRight) {
        this.cylMirrorRight = cylMirrorRight;
    }

    public Float getPrismRight() {
        return prismRight;
    }

    public void setPrismRight(Float prismRight) {
        this.prismRight = prismRight;
    }

    public Integer getAxialRight() {
        return axialRight;
    }

    public void setAxialRight(Integer axialRight) {
        this.axialRight = axialRight;
    }

    public Integer getPointPupilRight() {
        return pointPupilRight;
    }

    public void setPointPupilRight(Integer pointPupilRight) {
        this.pointPupilRight = pointPupilRight;
    }

    public Float getCylMirrorLeft() {
        return cylMirrorLeft;
    }

    public void setCylMirrorLeft(Float cylMirrorLeft) {
        this.cylMirrorLeft = cylMirrorLeft;
    }

    public Float getPrismLeft() {
        return prismLeft;
    }

    public void setPrismLeft(Float prismLeft) {
        this.prismLeft = prismLeft;
    }

    public Integer getAxialLeft() {
        return axialLeft;
    }

    public void setAxialLeft(Integer axialLeft) {
        this.axialLeft = axialLeft;
    }

    public Integer getPointPupilLeft() {
        return pointPupilLeft;
    }

    public void setPointPupilLeft(Integer pointPupilLeft) {
        this.pointPupilLeft = pointPupilLeft;
    }
}
