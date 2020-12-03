package com.reactnative_yyymusic_project;
import android.os.Bundle;  // rn.splash 
import org.devio.rn.splashscreen.SplashScreen;  // rn.splash  
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactnative_yyymusic_project";
  }

  @Override
   protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // rn.splash  
   super.onCreate(savedInstanceState);
  }
}
