package com.mall.dao;

import com.mall.pojo.OrderItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderItemMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderItem record);

    int insertSelective(OrderItem record);

    OrderItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderItem record);

    int updateByPrimaryKey(OrderItem record);

    List<OrderItem> getByOrderNo(Long orderNo);

    int batchInsert(List<OrderItem> orderItemList);

    List<OrderItem> getByOrderNoAddUserId(@Param("orderNo") Long orderNo, @Param("userId")Integer userId);
}