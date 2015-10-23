class nodejs {

  # point apt to our apt-cacher for all packages
  file { '/etc/apt/sources.list':
    owner => root,
    group => root,
    ensure => present,
    source => '/vagrant/puppet/modules/niit/sources.list',
  }

  # Custom system variables for niit vagrants
  file { '/etc/profile.d/000niitvars.sh':
    ensure => present,
    source => '/vagrant/puppet/modules/niit/000niitvars.sh',
  }

  # The next two resources installs nodejs as recommended by the nodejs web site
  exec { 'run update script':
    command  => '/usr/bin/curl --silent --location https://deb.nodesource.com/setup_0.12 | /bin/bash -',
    require  => File['/etc/apt/sources.list'],
  }
  package { 'nodejs':
    ensure   => installed,
    require  => Exec['run update script'],
  }

  # Install grunt, coffeescript globally
  exec { 'npm global packages':
    command => '/usr/bin/npm install gulp-cli coffee-script -g',
    require => Package['nodejs'],
  }

}

include nodejs
