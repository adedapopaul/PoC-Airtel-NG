package com.ercairtelng;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import eu.sigrlami.rnsimdata.RNSimDataReactPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import codes.simen.IMEI.IMEI;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.react.SmsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;

 import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
     new ReactAdapterPackage(),
     new ConstantsPackage(),
     new PermissionsPackage(),
     new FileSystemPackage()
  ), Arrays.<SingletonModule>asList());

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNHTMLtoPDFPackage(),
            new ReactNativeContacts(),
            new RNSendIntentPackage(),
            new RNImmediatePhoneCallPackage(),
            new RNSimDataReactPackage(),
            new KCKeepAwakePackage(),
            new RNDeviceInfo(),
            new IMEI(),
            new SmsListenerPackage(),
            new RNGestureHandlerPackage(),
            new SmsPackage(),
          new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }



}
