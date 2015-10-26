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
    # require  => File['/etc/apt/sources.list'],
  }
  package { 'nodejs':
    ensure   => installed,
    require  => Exec['run update script'],
  }

  # Install grunt, coffeescript globally
  exec { 'npm global packages':
    command => '/usr/bin/npm install gulp-cli coffee-script -g',
    require => Package['nodejs']
  }

  # Soft link trick to get over windows' limit of long file names
  file { '/home/vagrant/node_modules':
    ensure => 'directory',
    group  => 'vagrant',
    owner  => 'vagrant',
  }
  file { '/vagrant/node_modules':
      ensure   => 'link',
      target   => '/home/vagrant/node_modules',
      require  => File['/home/vagrant/node_modules']
  }

}

include nodejs
