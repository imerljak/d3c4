workspace "Big Bank plc" "This is an example workspace to illustrate key features of Structurizr." {

  model {
    customer = person "Personal Banking Customer" "A customer of the bank, with personal bank accounts."
    bank = softwareSystem "Internet Banking System" "Allows customers to view information about their bank accounts, and make payments." {
      web = container "Web Application" "Delivers the static content and the Internet banking single page application." "Java and Spring MVC"
      spa = container "Single-Page Application" "Provides all of the Internet banking functionality to customers via their web browser." "JavaScript and Angular"
      mobile = container "Mobile App" "Provides a limited subset of the Internet banking functionality to customers via their mobile device." "Xamarin"
      api = container "API Application" "Provides Internet banking functionality via a JSON/HTTPS API." "Java and Spring MVC"
      db = container "Database" "Stores user registration information, hashed authentication credentials, access logs, etc." "Oracle Database Schema"
    }
    mainframe = softwareSystem "Mainframe Banking System" "Stores all of the core banking information about customers, accounts, transactions, etc."
    email = softwareSystem "E-mail System" "The internal Microsoft Exchange e-mail system."

    customer -> bank "Views account balances, and makes payments using"
    bank -> mainframe "Gets account information from, and makes payments using"
    bank -> email "Sends e-mail using"
    email -> customer "Sends e-mails to"

    customer -> web "Visits bigbank.com/ib using" "HTTPS"
    customer -> spa "Views account balances, and makes payments using"
    customer -> mobile "Views account balances, and makes payments using"

    web -> spa "Delivers to the customer's web browser"
    spa -> api "Makes API calls to" "JSON/HTTPS"
    mobile -> api "Makes API calls to" "JSON/HTTPS"
    api -> db "Reads from and writes to" "JDBC"
    api -> mainframe "Makes API calls to" "XML/HTTPS"
    api -> email "Sends e-mail using" "SMTP"
  }

  views {
    systemContext bank "SystemContext" "The system context diagram for the Internet Banking System." {
      include *
      autoLayout TB
    }

    container bank "Containers" "The container diagram for the Internet Banking System." {
      include *
      autoLayout TB
    }

    styles {
      element "Person" {
        background #08427b
        color #ffffff
        shape Person
      }
      element "Software System" {
        background #1168bd
        color #ffffff
      }
      element "Container" {
        background #438dd5
        color #ffffff
      }
      relationship "Relationship" {
        dashed true
      }
    }
  }
}
