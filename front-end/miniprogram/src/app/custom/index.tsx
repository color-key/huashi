import React from 'react';
import { View, Image, Button } from 'remax/one';
import { chooseImage, request, showToast, showLoading, hideLoading, navigateTo, showModal, uploadFile } from 'remax/wechat';
import {login} from '@/lib/login';
import './index.scss';
import {APPC} from '../style';
import AddPhotoIcon from '@/components/icons/add-photo';
import {SERVER_URL} from '@/env';

const CLASS_PREFIX = APPC+'-custom';

export default () => {
  const [state, setState] = React.useState({faceFront: null, faceLeft: null, faceRight: null});
  const [disabled, setDisabled] = React.useState(false);
  const openidRef = React.useRef();
  const types = {faceFront: 0, faceLeft: 1, faceRight: 2}

  const handleAddPhoto = (side: 'faceFront'|'faceLeft'|'faceRight') => {
    chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        showLoading({
          title: '上传中',
        });
        const tempFilePaths = res.tempFilePaths;
        const tempFilesSize = res.tempFiles[0].size;
        if(tempFilesSize <= 2000000){
          login().then((res: any) => {
            if(res.success){
              openidRef.current = res.openid;
              uploadFile({
                url: SERVER_URL+'/faceUpload',
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                  'userId': res.openid,
                  'type': types[side]
                },
                success (res){
                  const data: any = JSON.parse(res.data);
                  if(data.success){
                    setState({...state, [side]: tempFilePaths[0]});
                  }else{
                    showToast({
                      title: "图片上传失败，请重试",
                      icon: "none"
                    })
                  }
                },
                fail(){
                  showToast({
                    title: "图片上传失败，请重试",
                    icon: "none"
                  })
                },
                complete(){
                  hideLoading();
                }
              })
            }
          })
        }else{
          showToast({
            title: "请上传不大于2M的图片",
            icon: "none"
          })
        }
      }
    })
  }

  React.useEffect(() => {
    setDisabled([state.faceFront].includes(null))
  }, [JSON.stringify(state)]);

  const handleUpload = () => {
    if(state.faceFront === null){
      showToast({
        title: "请上传人脸正脸照片",
        icon: "none"
      })
    }else{
      setDisabled(true);
      showLoading({
        title: '上传中',
      })
      request({
        url: SERVER_URL+'/face',
        method: 'POST',
        data: {
          userId: openidRef.current,
          face2: Boolean(state.faceLeft),
          face3: Boolean(state.faceRight),
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res: any) {
          console.log(res, res.data)
          setDisabled(false);
          let error = null;
          if(res.statusCode !== 200){
            error = '人脸识别失败';
          }else if(!res.data.success){
            error = res.data.error;
          }
          hideLoading();
          if(error){
            showModal({
              title: '提示',
              content: error,
              showCancel: false,
            })
          }else{
            navigateTo({url: "/pages/face3D/index"});
          }
        },
        fail(res){
          console.log(res);
        }
      })
    }
  }

  return (
    <View className={CLASS_PREFIX+'-root'}>
      <View className={CLASS_PREFIX+'-container'}>
        <View className={CLASS_PREFIX+'-tip'}>
          最小200*200像素，最大4096*4096像素，最大2MB 
        </View>
        <View className={CLASS_PREFIX+'-front'} onTap={() => handleAddPhoto('faceFront')}>
          {
            state.faceFront ?
            <Image src={state.faceFront!} className={CLASS_PREFIX+'-img'}/>
            :
            <View className={CLASS_PREFIX+'-addPhoto'}>
              <View><AddPhotoIcon/></View>
              <View>上传人脸正脸照片</View>
              <View>（必传）</View>
            </View>
          }
        </View>
        <View className={CLASS_PREFIX+'-side'}>
          <View className={CLASS_PREFIX+'-side-left'} onTap={() => handleAddPhoto('faceLeft')}>
            {
              state.faceLeft ?
              <Image src={state.faceLeft!} className={CLASS_PREFIX+'-img'}/>
              :
              <View className={CLASS_PREFIX+'-addPhoto'}>
                <View><AddPhotoIcon/></View>
                <View>上传左侧侧脸照片</View>
                <View>（选传）</View>
              </View>
            }
          </View>
          <View className={CLASS_PREFIX+'-side-right'} onTap={() => handleAddPhoto('faceRight')}>
            {
              state.faceRight ?
              <Image src={state.faceRight!} className={CLASS_PREFIX+'-img'}/>
              :
              <View className={CLASS_PREFIX+'-addPhoto'}>
                <View><AddPhotoIcon/></View>
                <View>上传右侧侧脸照片</View>
                <View>（选传）</View>
              </View>
            }
          </View>
        </View>
        <View className={CLASS_PREFIX+'-side-btns'}>
          {
            state.faceLeft ?
            <Button style={state.faceLeft ? {} : {display: 'none'}} className={CLASS_PREFIX+'-side-left-btn'} onTap={() => setState({...state, faceLeft: null})}>
              删除
            </Button>
            :
            <View className={CLASS_PREFIX+'-side-left-btn'}></View>
          }
          {
            state.faceRight ?
            <Button style={state.faceRight ? {} : {display: 'none'}} className={CLASS_PREFIX+'-side-right-btn'} onTap={() => setState({...state, faceRight: null})}>
              删除
            </Button>
            :
            <View className={CLASS_PREFIX+'-side-right-btn'}></View>
          }
        </View>
        <Button disabled={disabled} className={CLASS_PREFIX+'-btn'} onTap={handleUpload}>脸部照片提交</Button>
      </View>
    </View>
  );
};
