// ==========================================================================
// Project:  Ember Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals MyApp:true */

module('system/mixin/binding/oneWay_test', {
  setup: function() {
    MyApp = {
      foo: { value: 'FOO' },
      bar: { value: 'BAR' }
    };
  },

  teardown: function() {
    MyApp = null;
  }
});

test('oneWay(true) should only sync one way', function() {
  var binding;
  Ember.run(function(){
    binding = Ember.oneWay(MyApp, 'bar.value', 'foo.value');
  });
  
  equal(Ember.getPath('MyApp.foo.value'), 'FOO', 'foo synced');
  equal(Ember.getPath('MyApp.bar.value'), 'FOO', 'bar synced');

  Ember.run(function(){
    Ember.setPath('MyApp.bar.value', 'BAZ');
  });
  
  equal(Ember.getPath('MyApp.foo.value'), 'FOO', 'foo synced');
  equal(Ember.getPath('MyApp.bar.value'), 'BAZ', 'bar not synced');

  Ember.run(function(){
    Ember.setPath('MyApp.foo.value', 'BIFF');
  });
  
  equal(Ember.getPath('MyApp.foo.value'), 'BIFF', 'foo synced');
  equal(Ember.getPath('MyApp.bar.value'), 'BIFF', 'foo synced');

});

