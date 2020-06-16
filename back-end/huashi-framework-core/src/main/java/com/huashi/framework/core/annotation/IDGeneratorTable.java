package com.huashi.framework.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 定义运行时注解，使用在entity上，用来在框架层面自动为entity赋予ID值
 * @author xiaoyu
 *
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface IDGeneratorTable {
	String table();
	long startID() default 0;
}
