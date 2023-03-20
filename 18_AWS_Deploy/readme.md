# AWS EC2

기존에 해본 방법은 AWS EC2 서비스를 이용한 방법으로 배포를 하기 가장 쉽고 기본적인 사항으로 진행했었다.

EC2 서비스는 AWS에서 제공하는 서비스 중 하나로 가상화된 컴퓨터 리소스를 얻을 수 있는 서비스이다.

# AWS 계정

사진1

IAM 서비스를 이용해야한다.

배포를 하는 사람이 여러 명일 때 한 가지 Root 계정을 공유해서 사용하지 않는다. 보안상, 관리 및 추적을 위해서 Root계정을 공유하지 않고, IAM 서비스를 이용해서 사용자를 생성하여 필요한 권한만 부여해서 작업을 한다.

AWS를 이용할 수 있는 계정은 2가지 종류가 있다.

1. Root계정 : AWS 계정을 처음 만들 때 생성되는 기본 계정으로 모든 AWS 서비스에 대한 권한이 있다.
   보안상의 이유로 최소한으로 사용하는 것이 좋고 세부적인 권한이 많은 IAM 계정을 생성하여서 관리하는 것이 좋다.

2. IAM 계정 : 필요한 권한만 부여된 계정으로 IAM 계정으로 여러 사용자가 AWS 리소스를 공유하고 서로 다른 권한을 가진 사용자 계정을 생성할 수 있다.

## 사용자 생성하기

사진 2,3

좌측 사이드바에서 사용자 탭에서 사용자를 추가할 수 있다.

사진 4

사용자 세부 정보를 지정해서 사용자의 이름을 지정할 수 있다.

사진 5

사용자에게 부여할 권한을 선택할 수 있고, 기존에 있는 권한을 이용하여 부여할수도 있고, 아예 새롭게 지정해서 만들 수 있다.
그룹을 이용해서 그 그룹에 적용된 권한을 부여하거나 새로운 그룹을 생성해서 부여하는 방법도 있다.

### 여러 IAM 사용자에게 동일한 권한 부여하기

IAM 사용자를 생성하는 과정에서 권한을 부여할 수 있다. 각각 다른 권한을 줄 수도 있고, 모든 사용자에게 똑같은 권한을 줄 수 있다. 하지만 이렇게 하면 개별로 관리를 해야해서 어떤 권한을 모두에게서 제외시키려 할 때, 100개의 사용자면 100개의 사용자의 권한을 하나씩 제외해주어야 한다.
이러한 번거로운 과정을 한번에 처리하기 위해서
`사용자 그룹`이라는 영역에서 사용자를 선택해서 그룹을 지어두고, 그 그룹의 참여자에게 권한을 주는 방식을 사용하여 관리할 수 있다.
어떠한 사용자가 그 권한이 필요없을 경우, 그 그룹에서만 제외하면 된다.

`사용자 그룹`기능을 이용하여 권한 부여 및 제한에 조금 더 쉽고 빠르게 처리할 수 있다.

### **권한**

사진 6

`Amazon EC2 Full Access` 권한을 이용하여 Amazon EC2 서비스에서 제공하는 모든 작업에 대한 권한을 얻을 수 있다.

만들어진 사용자를 선택해서 들어가면 보안 자격 증명 탭에서 콘솔로그인, 액세스 키가 있다.

1. 콘솔 로그인
   콘솔콘솔로그인에 주어진 콘솔 로그인 링크 주소를 통해서 IAM 계정으로 로그인페이지로 이동할 수 있고, 콘솔 엑세스 관리 버튼을 이용해서 암호를 활성화 할 수 있다.
2. 액세스 키
   엑세스 키 만들기를 이용하여 이 사용자에 대한 엑세스 키, 시크릿 키를 생성할 수 있다.

### **액세스 키**

엑세스 키 만들기를 이용하여 액세스키를 생성한다.
CLI 환경을 이용한 인스턴스 생성을 하기 위해서
`Command Line Interface(CLI)` 를 선택하여 액세스 키를 만든다.

.csv파일을 다운받아서 다른 폴더에 보관하여 **절대 노출 되지 않도록 한다.**

# AWS CLI

AWS-CLI는 터미널에서 다양한 AWS 서비스를 관리하고 상호 작용할 수 있도록 Amazon Web Services에서 제공하는 도구이다.
설치를 하고 나면 `aws` 명령어를 이용한 작업을 할 수 있다.

## AWS CLI 설치하기 (macOS)

1. curl 명령을 이용하여 파일을 다운로드 한다.

```sh
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
```

2. 다운로드한 .pkg 파일을 소스로 지정하여 표준 macOS `installer` 프로그램을 실행한다.
   `-pkg` 파라미터를 사용하여 설치할 패키지의 이름을 지정하고 `-target /` 파라미터를 사용하여 패키지를 설치할 드라이브를 지정한다.
   파일은 /usr/local/aws-cli에 설치되고 /usr/local/bin에 symlink가 자동으로 만들어진다.
   해당 폴더에 쓰기 권한을 부여하려면 명령에 `sudo`를 포함해서 작성한다.

```sh
$ sudo installer -pkg ./AWSCLIV2.pkg -target /
```

디버그 로그가 /var/log/install.log에 기록된다.

3. 설치 확인하기

```sh
$ which aws
# /usr/local/bin/aws

$ aws --version
#aws-cli/2.11.4 Python/3.11.2 Darwin/20.6.0 exe/x86_64 prompt/off
```

# CLI를 이용하여 AWS EC2 인스턴스 생성하기

기존에 console(GUI환경)을 이용한 방법은
`Image(OS) -> keypair -> 보안그룹` 순으로 생성했지만
CLI환경을 이용한 방법은
`keypair -> 보안그룹 -> Image(OS)` 순으로 생성한다.

## 1. AWS-CLI 초기 세팅

```sh
# AWS-CLI설치를 확인한다.
aws --version

# AWS 초기 세팅
aws configure

```

1. 터미널에 `aws configuere` 명령어를 입력한다.
2. 세팅을 위한 데이터를 입력한다.
    -   1. 액세스 키 : IAM의 Access Key (생성했던 .csv 파일)
    -   2. 시크릿 키 : IAM의 Secret Access Key (생성했던 .csv 파일)
    -   3. 리전 이름 : 접속할 지역의 고유코드 (서울 : `ap-northeast-2`)
    -   4. 데이터 타입 (`json`)
3. `aws configure list` 를 이용하여 설정한 내용 확인하기

## 2. key-pair 만들기

Keypair(`.pem`)을 생성한다.

```sh
# keypair 생성
$ aws ec2 create-key-pair --key-name [키이름] --query 'KeyMaterial' --output text > [pem파일이름]
```

결과로 `.pem` 파일이 생성된다. 이 파일은 외부로 노출되지 않도록 관리한다.

키가 AWS에 저장되지 않고 생성될 때만 검색할 수 있다. 나중에 복구할 수 없기 때문에 잘 저장해서 보관하고 잃어버리면 새 키 페어를 생성해야 한다.

## 3. 사용자만 키 파일을 읽을 수 있도록 설정

```sh
$ chmod 400 [pem파일이름].pem
```

### _만약 키페어를 다시 만들어야 한다거나, 수정을 원할 때는 삭제했다가 재 생성을 한다._

```sh
# keypair 삭제
$ aws ec2 delete-key-pair --key-name [pem파일이름]


# keypair 확인
$ aws ec2 describe-key-pairs --key-name
```

## 4. 보안그룹 설정하기

```sh
# 보안그룹 설정
$ aws ec2 create-security-group --group-name [보안 그룹 이름] --description ["보안그룹설명"]


# 보안그룹 삭제
$ aws ec2 delete-security-group --group-id [보안그룹 이름]
```

리턴된 값은 해당 보안그룹의 `고유식별자`이므로 이를 이용해서 해당 그룹을 알 수 있기 때문에 중요하다.

`리턴 값`
{
"GroupId": "sg-~~~~~~"
}

## 5. 보안그룹 규칙 설정

보안 그룹을 확인해보면 인바운드 규칙과 아웃바운드 규칙이 있다.
쉽게 생각하면 인바운드 규칙은 외부에서 인스턴스로 들어 올 때 방화벽을 통과할 수 있는 트래픽의 규칙을 정해줄 수 있고, 반대로 아웃바운드 규칙은 인스턴스에서 외부로 내보낼 때의 트래픽 규칙을 정하는 것이다.

외부로 내보내는 아웃바운드 규칙의 경우 나가는 모든 트래픽을 허용하지만, 인바운드 규칙은 사용자에 따라 다르게 지정해준다.

우리는 80, 22번 포트에 대한 트래픽을 허용하기 위해서 규칙을 추가해 주면 된다.

```sh
# 어떤그룹인지? 어떤 프로토콜인지? 어떤 포트인지? 어떤 IP인지?


# 80번 포트
$ aws ec2 authorize-security-group-ingress --group-id [보안그룹 식별자] --protocol tcp --port 80 --cidr 0.0.0.0/0


# 22번 포트
$ aws ec2 authorize-security-group-ingress --group-id [보안그룹 식별자] --protocol tcp --port 22 --cidr 0.0.0.0/0
```

## 6. Image(OS)지정 및 인스턴스 생성

```sh
$ aws ec2 run-instances
--image-id [image고유값]
--count [생성할 인스턴스 개수]
--instance-type [타입]
--key-name [키페어 이름(파일이름 아님)] --security-group-ids [보안그룹 고유식별자]
```

-   image 고유 id값 확인하기

https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#AMICatalog

사용할 image는 ubuntu 20.04 LTS 버전을 이용할 것이다.
`ami-0e735aba742568824`
