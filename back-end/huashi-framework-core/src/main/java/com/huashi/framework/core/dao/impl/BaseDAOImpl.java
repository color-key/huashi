package com.huashi.framework.core.dao.impl;

import com.huashi.framework.core.utils.PaginatorRequest;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * 注意：
 * 此类为DAO层扩展类，继承此类必须符合命名规范
 * 例：
 * ... interface TemplateDAOPlus{
 * }
 * ... interface TemplateDAO extends BaseDAO,TemplateDAOPlus{
 * }
 * ... class TemplateDAOImpl extends BaseDAOImpl implements TemplateDAOPlus{
 * }
 *
 * @author xiaoyu
 * @data 2020/5/31.
 */
public class BaseDAOImpl {

    @PersistenceContext
    private EntityManager entityManager;

    public EntityManager getEntityManager() {
        return entityManager;
    }

    /**
     * Build a query by given jql and a map of parameters
     *
     * @param jql
     * @param paramsMap
     * @return query
     */
    protected Query buildQuery(StringBuilder jql, Map<String, Object> paramsMap, boolean isNative) {
        String queryString = compileSQL(jql.toString(), paramsMap);
        // System.out.println(queryString);
        Query query = null;
        if (isNative) {
            query = this.entityManager.createNativeQuery(queryString);
        } else {
            query = this.entityManager.createQuery(queryString);
        }
        for (String key : paramsMap.keySet()) {
            if (queryString.contains(":" + key)) {
                query.setParameter(key, paramsMap.get(key));
            }
        }
        return query;
    }

    /**
     *
     * For native query
     *
     * @param sql
     * @param paramsMap
     * @param clazz
     * @return
     */
    protected org.hibernate.Query buildQuery(StringBuilder sql, Map<String, Object> paramsMap, Class<?> clazz) {
        String queryString = compileSQL(sql.toString(), paramsMap);
        // System.out.println(queryString);
        Session session = (Session) this.entityManager.getDelegate();
        org.hibernate.Query query = session.createSQLQuery(queryString)
                .setResultTransformer(Transformers.aliasToBean(clazz));
        for (String key : paramsMap.keySet()) {
            if (queryString.contains(":" + key)) {
                query.setParameter(key, paramsMap.get(key));
            }
        }
        return query;
    }

    /**
     * Build a paginator query.
     *
     * @param jql
     * @param paramsMap
     * @param paginatorRequest
     * @return query
     */
    protected Query buildQuery(StringBuilder jql, Map<String, Object> paramsMap, PaginatorRequest paginatorRequest,
                               boolean isNative) {
        if (paginatorRequest != null) {
            if (StringUtils.isNotBlank(paginatorRequest.getSortName())) {
                jql.append(" order by ").append(paginatorRequest.getSortName().split(" ")[0].replaceAll("'", ""))
                        .append(" ");
            }
            if (StringUtils.isNotBlank(paginatorRequest.getSortType())) {
                jql.append(paginatorRequest.getSortType());
            }
        }
        Query query = buildQuery(jql, paramsMap, isNative);
        if (paginatorRequest != null) {
            int skip = paginatorRequest.getSkip() > 0 ? paginatorRequest.getSkip() : 0;
            query.setFirstResult(skip);
            query.setMaxResults(paginatorRequest.getPageSize());
        }
        return query;
    }

    /**
     * For native query
     *
     * @param sql
     * @param paramsMap
     * @param paginatorRequest
     * @param clazz
     * @return
     */
    protected org.hibernate.Query buildQuery(StringBuilder sql, Map<String, Object> paramsMap, PaginatorRequest paginatorRequest, Class<?> clazz) {
        if (paginatorRequest != null) {
            if (StringUtils.isNotBlank(paginatorRequest.getSortName())) {
                sql.append(" order by ").append(paginatorRequest.getSortName().split(" ")[0].replaceAll("'", ""))
                        .append(" ");
            }
            if (StringUtils.isNotBlank(paginatorRequest.getSortType())) {
                sql.append(paginatorRequest.getSortType());
            }
        }
        org.hibernate.Query query = buildQuery(sql, paramsMap, clazz);
        if (paginatorRequest != null) {
            int skip = paginatorRequest.getSkip() > 0 ? paginatorRequest.getSkip() : 0;
            query.setFirstResult(skip);
            query.setMaxResults(paginatorRequest.getPageSize());
        }
        return query;
    }

    private static String compileSQL(String rawSql, Map<String, Object> params) {
        String newSql = rawSql;
        Pattern pattern = Pattern.compile("\\{[_*\\!*\\>*\\<*=*\\.*\\:*\\s*0-9A-Za-z]+\\}");
        Matcher matcher = pattern.matcher(newSql);
        while (matcher.find()) {
            String expression = matcher.group(0);
            //System.out.println(expression);
            Pattern subPattern = Pattern.compile(":[_*0-9A-Za-z]+");
            Matcher submather = subPattern.matcher(expression);
            if (submather.find()) {
                String parameters = submather.group(0).replace(":", "");
                if (params.containsKey(parameters)) {
                    Object value = params.get(parameters);
                    if (value instanceof String) {
                        value = ((String) value).replaceAll("%", "");
                        if (StringUtils.isBlank((String) value)) {
                            newSql = newSql.replace(expression, "");
                        }
                    }
                    if (value == null) {
                        newSql = newSql.replace(expression, "");
                    }
                } else {
                    newSql = newSql.replace(expression, "");
                }
            }
        }

        newSql = deleteEmptyExpression(newSql);
        newSql = newSql.replaceAll("\\{", "").replaceAll("}", "");
        //System.out.println(newSql);
        return newSql;
    }

    private static String deleteEmptyExpression(String newSql) {
        String result = newSql.replaceAll("(?i)\\{[and*or*\\s*\\(*\\)*]+\\}", "");
        Pattern pattern = Pattern.compile("(?i)or\\s*or");
        Matcher matcher = pattern.matcher(result);
        while (matcher.find()) {
            String orExpression = matcher.group(0);
            result = result.replace(orExpression, " or ");
            matcher = pattern.matcher(result);
        }

        Pattern andPattern = Pattern.compile("(?i)and\\s*and");
        Matcher andmatcher = andPattern.matcher(result);
        while (andmatcher.find()) {
            String orExpression = andmatcher.group(0);
            result = result.replace(orExpression, " and ");
            andmatcher = andPattern.matcher(result);
        }

        result = result.replaceAll("(?i)\\(\\s*and\\s*\\)", "");
        result = result.replaceAll("(?i)\\(\\s*or\\s*\\)", "");
        result = result.replaceAll("(?i)or\\s*\\)", ")");
        result = result.replaceAll("(?i)and\\s*\\)", ")");
        result = result.replaceAll("(?i)\\(\\s*or", "(");
        result = result.replaceAll("(?i)\\(\\s*and", "(");
        result = result.replaceAll("(?i)\\(\\s*or\\s*\\(", "((");
        result = result.replaceAll("(?i)\\(\\s*and\\s*\\(", "((");
        result = result.replaceAll("(?i)\\)\\s*or\\s*\\)", "))");
        result = result.replaceAll("(?i)\\)\\s*and\\s*\\)", "))");

        return result;
    }

}
