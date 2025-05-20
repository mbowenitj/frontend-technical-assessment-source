import { readFileSync, writeFileSync } from 'fs';
const appBuildGradlePath = 'android/app/build.gradle';
const buildGradlePath = 'android/build.gradle';

const writeFileToPath = (path, file) => {
  try {
    writeFileSync(path, file);
    console.log(`${path} altered successfully!`);
  } catch (err) {
    throw err;
  }
};

const alterGradleFile = (path, includeCheck, replace) => {
  let alteredFileStr,
    fileStr = readFileSync(path).toString().trim();
  if (!fileStr.includes(includeCheck)) {
    alteredFileStr = fileStr.replace(...replace);
  }
  if (alteredFileStr) {
    writeFileToPath(path, alteredFileStr);
  }
};

alterGradleFile(appBuildGradlePath, "apply plugin: 'kotlin-android'", [
  "apply plugin: 'com.android.application'",
  `apply plugin: 'com.android.application'
    apply plugin: 'kotlin-android'`
]);

alterGradleFile(
  buildGradlePath,
  `ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.8.20'`,
  [
    'buildscript {',
    `buildscript {
	ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.8.20'`
  ]
);

alterGradleFile(buildGradlePath, `classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"`, [
  'dependencies {',
  `dependencies {
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"`
]);

alterGradleFile(appBuildGradlePath, 'com.android.installreferrer:installreferrer:2.2', [
  'dependencies {',
  `dependencies {
    implementation "com.android.installreferrer:installreferrer:2.2"`
]);

alterGradleFile(appBuildGradlePath, 'com.google.firebase:firebase-crashlytics:18.6.2', [
  'dependencies {',
  `dependencies {
    implementation "com.google.firebase:firebase-crashlytics:18.6.2"`
]);

alterGradleFile(appBuildGradlePath, "apply plugin: 'com.google.firebase.crashlytics'", [
  `apply from: 'capacitor.build.gradle'`,
  `apply from: 'capacitor.build.gradle'
   apply plugin: 'com.google.firebase.crashlytics'`
]);

alterGradleFile(buildGradlePath, 'com.google.firebase:firebase-crashlytics-gradle:3.0.1', [
  `dependencies {`,
  `dependencies {
    classpath 'com.google.firebase:firebase-crashlytics-gradle:3.0.1'`
]);
