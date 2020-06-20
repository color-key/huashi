package com.huashi.framework.core.scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class ClassScanner {

    private static Logger log = LoggerFactory.getLogger(ClassScanner.class);
    // Scan the package recursively as the default way.
    private static boolean recursive = true;

    /**
     * Find the classes by given package
     * @param pack
     * @return Set<Class<?>>
     */
    public static Set<Class<?>> getClasses(String pack) {
        // The first collection of the class.
        Set<Class<?>> classes = new LinkedHashSet<Class<?>>();
        // Replace the "." by "/" for the package
        String packageName = pack;
        String packageDirName = packageName.replace('.', '/');

        Enumeration<URL> dirs;
        try {
            dirs = Thread.currentThread().getContextClassLoader()
                    .getResources(packageDirName);

            while (dirs.hasMoreElements()) {
                URL url = dirs.nextElement();
                String protocol = url.getProtocol();
                if ("file".equals(protocol)) {
                    log.info("Scan the class by file scan");
                    String filePath = URLDecoder.decode(url.getFile(), "UTF-8");
                    findAndAddClassesInPackageByFile(packageName, filePath,
                            recursive, classes);
                } else if ("jar".equals(protocol)) {
                    log.info("Scan the class by jar scan");
                    findAndAddClassesInPackageByJar(url, packageName,
                            packageDirName, classes);
                }
            }
        } catch (IOException e) {
            log.error("Failed to scan the class by given package", e);
        }

        return classes;
    }

    /**
     * Find the classes in package by file.
     * @param packageName
     * @param packagePath
     * @param recursive
     * @param classes
     */
    public static void findAndAddClassesInPackageByFile(String packageName,
                                                        String packagePath, final boolean recursive, Set<Class<?>> classes) {
        File dir = new File(packagePath);

        if (!dir.exists() || !dir.isDirectory()) {
            return;
        }

        File[] dirfiles = dir.listFiles(new FileFilter() {
            public boolean accept(File file) {
                return (recursive && file.isDirectory())
                        || (file.getName().endsWith(".class"));
            }
        });

        for (File file : dirfiles) {
            //if folder then self method again.
            if (file.isDirectory()) {
                findAndAddClassesInPackageByFile(
                        packageName + "." + file.getName(),
                        file.getAbsolutePath(), recursive, classes);
            } else {
                //remove the ".class" suffix
                String className = file.getName().substring(0,
                        file.getName().length() - 6);
                try {
                    classes.add(Thread.currentThread().getContextClassLoader()
                            .loadClass(packageName + '.' + className));
                } catch (ClassNotFoundException e) {
                    log.error("Can't find the class ="+packageName + '.' + className);
                }
            }
        }
    }

    /**
     * Find the classes in package by jar.
     * @param url
     * @param packageName
     * @param packageDirName
     * @param classes
     */
    public static void findAndAddClassesInPackageByJar(URL url,
                                                       String packageName, String packageDirName, Set<Class<?>> classes) {
        JarFile jar;
        try {
            jar = ((JarURLConnection) url.openConnection()).getJarFile();
            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                String name = entry.getName();
                if (name.charAt(0) == '/') {
                    name = name.substring(1);
                }
                if (name.startsWith(packageDirName)) {
                    int idx = name.lastIndexOf('/');
                    if (idx != -1) {
                        packageName = name.substring(0, idx).replace('/', '.');
                    }
                    if ((idx != -1) || recursive) {
                        if (name.endsWith(".class") && !entry.isDirectory()) {
                            String className = name
                                    .substring(packageName.length() + 1,
                                            name.length() - 6);
                            try {
                                classes.add(Class.forName(packageName + '.'
                                        + className));
                            } catch (ClassNotFoundException e) {
                                log.error("Can't find the class ="+packageName + '.' + className);
                            }
                        }
                    }
                }
            }
        } catch (IOException e) {
            log.error("Failed to find classes in the jar", e);
        }
    }

    public static void main(String... strings) {
        Set<Class<?>> clazzes = getClasses("com.huashi");
        for (Class<?> clazz : clazzes) {
            System.out.println(clazz.getName());
        }
    }
}
