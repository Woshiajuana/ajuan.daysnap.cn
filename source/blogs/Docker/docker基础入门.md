---
title: docker基础入门
createTime: 2020-06-23 16:29
tags: docker
abstract:
---

## mac 安装 docker



## 常用命令

### 命令帮助

`docker --help`

```bash
Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           "/Users/ajuan/.docker")
  -c, --context string     Name of the context to use to connect to the daemon
                           (overrides DOCKER_HOST env var and default context
                           set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "/Users/ajuan/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "/Users/ajuan/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default
                           "/Users/ajuan/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  buildx*     Docker Buildx (Docker Inc., v0.8.2)
  compose*    Docker Compose (Docker Inc., v2.4.1)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  sbom*       View the packaged-based Software Bill Of Materials (SBOM) for an image (Anchore Inc., 0.6.0)
  scan*       Docker Scan (Docker Inc., v0.17.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a containers changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a containers filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a containers filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
```

### 查看镜像

```bash
docker images
# or
docker image ls
```

### 搜索镜像

```bash
# docker search <镜像名称>
docker search redis
```

### 拉取镜像

```
# docker pull <镜像名称>:<版本号>
docker pull redis
```

### 删除镜像

```bash
# docker rmi <镜像 id>
docker rmi 123456
```

### 查看容器

```bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a
```

### 停止容器

```bash
# docker stop <容器名>
docker stop myredis

# docker stop <容器id>
docker stop 123
```

## 进入容器

```bash
# docker exec -it <容器名> /bin/bash
docker exec -it myredis /bin/bash

# or

# docker exec -it <容器id> /bin/bash
docker exec -it 123 /bin/bash
```
