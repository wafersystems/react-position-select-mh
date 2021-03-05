import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import {Icon, Toast} from 'antd-mobile';
import styles from './contacts.less';

const PositionSelect = ({
                          spaceTree, onClose, onChange, placeholder, floorErrorTip, defaultValue,
                          cancelButtonText, okButtonText, buildingName, buildingId ,floorName,
                          floorId
                        }) => {

  const [choseBuilding, setChoseBuilding] = useState(null);
  const [choseBuildingIndex, setChoseBuildingIndex] = useState(0);
  const [selectFloor, setSelectFloor] = useState(null);
  const [showPositionSelect, setShowPositionSelect] = useState(false);
  const [info, setInfo] = useState({});

  /**
   *  处理初始化数据
   */
  useEffect(() => {
    try {
      if(defaultValue.building){
        setChoseBuilding(defaultValue.building)
      }
      if(defaultValue.floor){
        setSelectFloor(defaultValue.floor)
      }
    } catch (e) {
      console.error(`PositionSelect defaultValue error.`)
    }
  }, [defaultValue]);

  /**
   *  处理初始化数据
   */
  useEffect(() => {
    if (spaceTree.length === 0) {
      return;
    }
    try {
      setChoseBuilding(spaceTree[0])
    } catch (e) {
      console.error(`PositionSelect defaultValue error.`)
    }

  }, [spaceTree]);

  /**
   *
   * @param val
   * @param index
   */
  const buildingSelect = (val, index) => {
    setChoseBuilding(val);
    setChoseBuildingIndex(index);
    setSelectFloor(null);
  }

  /**
   * 构建楼宇
   * @param data
   * @returns {JSX.Element}
   */
  const makeBuildingList = (data) => {
    return (
      <div className={styles.building_list}>
        {data.map((val, index) => {
          let cla;
          if (choseBuilding && choseBuilding[buildingId] === val[buildingId]) {
            cla = classNames(styles.item, styles.item_select);
          } else {
            cla = classNames(styles.item);
          }
          return (
            <div className={cla} key={val.id || index} onClick={() => buildingSelect(val, index)}>
              {val[buildingName]}
            </div>
          );
        })}
      </div>)
  }

  /**
   *
   * @param val
   */
  const FloorSelect = (val) => {
    setSelectFloor(val);
  }

  /**
   * 构建楼层
   * @param data
   * @returns {JSX.Element}
   */
  const makeFloorList = (data) => {
    return (
      <div className={styles.floor_list}>
        {data.map((val, index) => {
          let cla;
          if (selectFloor && selectFloor[floorId] === val[floorId]) {
            cla = classNames(styles.item, styles.item_select);
          } else {
            cla = classNames(styles.item);
          }
          return (
            <div className={cla} key={val.id || index} onClick={() => FloorSelect(val)}>
              <span>{val[floorName]}</span> {selectFloor && selectFloor.id === val.id &&
            <div className={styles.check}><Icon type="check" size="xxs"/></div>}
            </div>
          );
        })}
      </div>)
  }

  /**
   * button 样式
   * @param type
   * @returns {string}
   */
  const makeButtonClass = (type = '') => {
    if (type === 'primary') {
      return classNames('am-button', 'am-multi-select-btns-btn', 'am-button-primary', 'am-button-inline', styles.button)
    }
    return classNames('am-button', 'am-multi-select-btns-btn', 'am-button-inline', styles.button)
  }

  /**
   *
   */
  const infoClickHandle = () => {
    setShowPositionSelect(!showPositionSelect);
  }

  /**
   * 重置回调
   */
  const cancelHandle = () => {
    setSelectFloor(null)
    setChoseBuilding(spaceTree[0])
    try {
      setSelectFloor(spaceTree[0].children[0])
    } catch (e) {
      console.error('空间树数据children为空，请检查数据')
    }

  }

  /**
   *  确认回调
   */
  const okHandle = () => {
    if (!selectFloor) {
      Toast.fail(floorErrorTip)
      return;
    }
    setShowPositionSelect(false);
    makeInfo();
    if (onChange) {
      onChange({
        building:choseBuilding,
        floor:setSelectFloor
      });
    }
  }

  /**
   * 关闭回调
   */
  const closeHandle = () => {
    setShowPositionSelect(false);
    if (onClose) {
      onClose();
    }
  }

  /**
   *
   * @returns {boolean}
   */
  const showInfo = () => {
    return info.hasOwnProperty('building') && info.hasOwnProperty('floor');
  }

  /**
   *
   */
  const makeInfo = () => {
    setInfo({
      building: choseBuilding ? choseBuilding[buildingName]:'',
      floor: selectFloor ?selectFloor[floorName]:''
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.info} onClick={infoClickHandle}>
        {!showInfo() && <div className={styles.placeholder}>{placeholder}</div>}
        {showInfo() && <div className={styles.building_title}>{info.building}</div>}
        {showInfo() && <div className={styles.floor_title}>{info.floor}</div>}
        {showInfo() && showPositionSelect && <div className={styles.icon}>
          <Icon type="up"/>
        </div>}
        {showInfo() && !showPositionSelect && <div className={styles.icon}>
          <Icon type="down"/>
        </div>}
      </div>
      {showPositionSelect &&
      <div className="am-flexbox am-menu multi-foo-menu am-flexbox-dir-column am-flexbox-align-stretch"
           style={{height: '218px', position: 'absolute', width: '100%', zIndex: 80}}>
        <div className="am-flexbox am-menu-select-container am-flexbox-align-start" style={{height: '182px'}}>
          <div className="am-flexbox-item am-menu-select-container-submenu" role="tabpanel" aria-hidden="false">
            <div className="am-list am-sub-menu" style={{paddingTop: '0px'}}>
              <div className="am-list-body">
                {makeBuildingList(spaceTree)}
              </div>
            </div>
          </div>
          <div className="am-flexbox-item am-menu-select-container-submenu" role="tabpanel" aria-hidden="false">
            <div className="am-list am-sub-menu" style={{paddingTop: '0px'}}>
              <div className="am-list-body">
                {spaceTree[choseBuildingIndex].children && makeFloorList(spaceTree[choseBuildingIndex].children)}
              </div>
            </div>
          </div>
        </div>
        <div className="am-multi-select-btns" style={{height: '36px'}}>
          <a role="button" className={makeButtonClass()}
             aria-disabled="false" onClick={cancelHandle}><span>{cancelButtonText}</span></a>
          <a role="button" className={makeButtonClass('primary')}
             aria-disabled="false" onClick={okHandle}><span>{okButtonText}</span></a>
        </div>
      </div>}
      {showPositionSelect && <div className={styles.menu_mask} onClick={closeHandle}></div>}
    </div>
  );
};

PositionSelect.propTypes = {
  spaceTree: PropTypes.array.isRequired, // 空间数据
  showPositionSelect: PropTypes.bool.isRequired, // 是否显示
  onClose: PropTypes.func, // 关闭回调
  onChange: PropTypes.func.isRequired, // 数据变化后回调
  placeholder: PropTypes.string, // 提示
  defaultValue: PropTypes.array, // 默认值
  okButtonText: PropTypes.string, // 确认按钮文字
  cancelButtonText: PropTypes.string, // 重置按钮文字
  floorErrorTip: PropTypes.string, // 未选择楼层错误提示
  buildingName:PropTypes.string, // 大楼名称key
  buildingId:PropTypes.string, // 大楼id key
  floorName:PropTypes.string, // 楼层名称key
  floorId:PropTypes.string, // 楼层id key
};

PositionSelect.defaultProps = {
  placeholder: '请选择',
  onClose: () => {
  },
  defaultValue: null,
  showPositionSelect: false,
  okButtonText: '确定',
  cancelButtonText: '重置',
  floorErrorTip: '请选择楼层', // 未选择楼层错误提示
  buildingName:'name', // 大楼名称key
  buildingId:'id', // 大楼id key
  floorName:'name', // 楼层名称key
  floorId:'id', // 楼层id key
};

export default PositionSelect;
