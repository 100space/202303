# AWS EC2

배포를 하기 위한 가장 쉽고 기본적인 사항에 대해서만 해봤었다.
AWS EC2는 아마존에서 만든 서비스 중에 하나이다.

가상화로 컴퓨터 한대를 만들어주는 것이 EC2의 기능이다

-   IAM

    -   console : 아마존에서 말하는 console은 GUI를 말하는 것이다.(webpage)

-   계정
    -   root 계정 : 일반적인 회원가입을 통해서 접속한 계정..
    -   IAM 사용자 계정 ( 부계정, 권한주기)

AWS 배포는
여러사람이 배포를 진행하기 때문에 한 서버에 여러사용자가 있는데, 모든 사람들한테 루트계정을 주게되면 아마존에 다른 서비스를 막 사용할 수 있다.

그렇기 따문에 root 계정을 통해서 IAM 계정을 만들어서 권한을 부여하여 기능의 제한을 둘 수 있다.

## IAM 계정

사진 1

검색 창을 통해서 한다.

사진 2

좌측 사이드바에서
사용자 : 부계정
사용자 그룹 : 하나의 계정을 만든 것을 여러개로 복사해서 권한을 부여할 수 있다..?
( 배포자가 5명이면 사용자가 5개가 있어야 추적 관리하기 편하다.)

**사용자가 있을 때, 똑같은 권한을 줄떄**

-   groupdA
    -   EC2
    -   RDS

만드는 것은 똑같아도 나중에 관리할 때 편한다.
그룹을 통해서 권한을 모든 사람들한테 동일하게 부여할 수 있고 나중에 제외 하려고 할 때 그룹에서만 빼도 그 그룹을 통해 만든 사용자는 그룹의 설정을 가지기 때문에 그룹의 모든사용자에게 기능이 빠진다.

태그는 나중에 관리하기 위해서 검색을 위한 느낌 (해시태그..)

-   사용자 > 권한 : 사용자를 생성한 후에도 권한 추가/제거를 이용하여 권한을 추가, 삭제가능하다

-   사용자 > 보안자격증명
    -   콘솔 로그인 :gui 환경에서 로그인할 때 사용할 암호 등등을 설정할 수 있다.
    -   액세스 :

### 서비스 형태

백엔드에서 aws에 파일을 올려야하는 경우 ( ex.. s3)
IAM이라는 공간에서 내 키를 검증을 하고 이 키가 어디 리전인지를 확인하는 과정들이 있다.( 더 자세하게 뭔가 있지만...일단)
누구나 내 계정으로 들어와서 작업할 수 없도록 IAM을 이용하여 관리한다.

## IAM 로그인

https://175161013354.signin.aws.amazon.com/console

## 액세스키

생성된 파일(.csv)이 절대 github에 올라가면 안된다.

# AWS CLI

Console(gui환경), CLI

## 설치하기

https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html

aws 명령어를 사용할 수 있게 된다.

# CLI를 이용하여 AWS EC2 생성하기

## AWS CLI 기본설정

```sh
aws --version  #설치가 완료된 상태에서 가능( 내용이 있어야 한다)
aws configure

# 1. 액세스 키 -> IAM에 대한 액세스 키
# 2. 시크릿 키 -> IAM에 대한 시크릿 키
# 3. 리전 : ap-northeast-2
# 4. 데이터타입 : JSON

aws configure list # 명령어를 확인할 수 있다.

```

## 데이터 타입 변경하기

```sh
$ aws configure set default.output json

```

## 인스턴스 생성할 때 필요사항

keypair .. `pem`파일 <-- 외부접속을 위한 파일
보안 그룹 .. 인바운드, 아웃바운드 (서버기준 데이터가 들어오는 것이 인바운드, 내보내는 것이 아웃바운드) : 방화벽 같은 개념 .. 80포트로 갈 수 있게 풀어놔 줘야한다.
image : 어떤 OS를 이용할 것인가.

### gui

image, keypair, 보안그룹 순으로 설정해서 만들었다.

### CLI환경

keypair, 보안그룹, image 선택해서 OS 설정

# keypair 만들기

```sh
$ aws ec2 create-key-pair --key-name keysample --query 'KeyMaterial' --output text > baeksKeypair.pem
```

## 권한 설정

```sh
$ chmod 400 ~~~.pem
```

## key pair 내용확인하기

```sh
$ aws ec2 describe-key-pairs --key-name
```

## 삭제하기

```sh
$ aws ec2 delete-key-pair --keyname
```

# 보안그룹

## 1. 보안그룹 생성

```sh
$ aws ec2 create-security-group --group-name front-end-sg --description "front-sg"
```

리턴된 값

{
"GroupId": "sg-07cf52841f79368c1"
}
은 고유식별자이기 때문에 이를 이용해서 해당 그룹을 알 수 있다.

## 2. 해당 그룹에 규칙

생성하게 되면 모든페이지에 아웃바운드는 가능하지만 인바운드를 못하고 있는 것을 웹페이지를 통해서 확인할 수있다.

그래서 인바운드에 대한 규칙을 정해준다.

2가지 포트에 대한 규칙을 넣어야한다. 80, 22

```sh
$ aws ec2 authorize-security-group-ingress --group-id sg-07cf52841f79368c1 --protocol tcp --port 80 --cidr 0.0.0.0/0
$ aws ec2 authorize-security-group-ingress --group-id sg-07cf52841f79368c1 --protocol tcp --port 22 --cidr 0.0.0.0/0
# 어떤 그룹
# 프로토콜
# 포트
# IP
```

## 3. 삭제

```sh
$ aws ec2 delete-security-group --group-id sg-07cf52841f79368c1

```

# EC2 인스턴스 생성

```sh
aws ec2 run-instances
# --image-id : 어떤 OS를 사용할 것인가 // ubuntu : ami-0e735aba742568824
# --count : 몇개 // 1
# --instance-type // t2.micro
# --key-name // keysample
# --security-group-ids //  sg-07cf52841f79368c1

aws ec2 describe-image --owners self amazon # 모든 OS가 불러와짐 gui에서 확인하는게..빠를듯.. AMI ID...
https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#AMICatalog:



$ aws ec2 run-instances --image-id ami-0e735aba742568824 --count 1 --instance-type t2.micro --key-name keysample --security-group-ids sg-07cf52841f79368c1



ec2-54-180-83-162.ap-northeast-2.compute.amazonaws.com
```

# 내일

nginx 를 설치해서 서버 배포 할 예정.

## CD

github main 브랜치에 push가 진행되면 자동으로 배포되게 할 예정
