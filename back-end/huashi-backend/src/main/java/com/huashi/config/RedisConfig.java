package com.huashi.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;


/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

//    @Bean
//    public CacheManager cacheManager(RedisTemplate template){
//        return new RedisCacheManager(template);
//    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(LettuceConnectionFactory factory){
        StringRedisTemplate template = new StringRedisTemplate(factory);
        template.setValueSerializer(new StringRedisSerializer());
        return template;
    }


}
