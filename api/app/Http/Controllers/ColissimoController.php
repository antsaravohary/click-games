<?php

namespace App\Http\Controllers;

use App\Exceptions\PickbazarException;
use App\Models\Delivery;
use App\Models\Order;
use App\Utility\MTOM_ResponseReader;
use Carbon\Carbon;
use Illuminate\Http\Request;
use SimpleXMLElement;
use SoapClient;

define("SERVER_NAME", 'https://ws.colissimo.fr'); //TODO : Change server name 
define("LABEL_FOLDER", './storage/label-colissimo/');
class ColissimoController extends Controller
{
    //

    public function  label($ref, Request $request)
    {

        $order = Order::where("ref", $ref)->first();

        //   return $order;
        $requestParameter = array(
            'contractNumber' => '440122',
            'password' => '67f2b54',
            'outputFormat' => array('outputPrintingType' => 'PDF_10x15_300dpi'),
            'letter' => array(
                'service' => array(
                    'productCode' => 'DOM',
                    'depositDate' => Carbon::now()->format("Y-m-d")
                ),
                'parcel' => array('weight' => $request->post("weight")),
                'sender' => array(
                    'address' => array(
                        'companyName' => 'CLICK GAMES', 'line2' => '8 RUE LOUIS ARAGON', 'countryCode' => 'FR', 'city' => 'Audincourt', 'zipCode' => '25400'
                    )
                ),
                'addressee' => array(
                    'address' => array(
                        'lastName' => $order->customer->first_name, 'firstName' => $order->customer->last_name, 'line2' =>  $order->shipping_address['address']['street_address'], 'countryCode' => 'FR', 'city' => $order->shipping_address['address']['city'], 'zipCode' => $order->shipping_address['address']['zip'],
                        'mobileNumber' => $order->customer_contact
                    )
                ),

            )
        );
        //   return $requestParameter;

        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" />');
        $xml->addChild("soapenv:Header");
        $children = $xml->addChild("soapenv:Body");
        $children = $children->addChild("sls:generateLabel", null, 'http://sls.ws.coliposte.fr');
        $children = $children->addChild("generateLabelRequest", null, "");
        $this->array_to_xml($requestParameter, $children);
        $requestSoap = $xml->asXML();
        $resp = new SoapClient(SERVER_NAME . '/sls-ws/SlsServiceWS?wsdl');
        $response = $resp->__doRequest($requestSoap, SERVER_NAME . '/sls-ws/SlsServiceWS', 'generateLabel', '2.0', 0);
        //+ Parse Web Service Response 


        $parseResponse = new MTOM_ResponseReader($response);
        $resultat_tmp = $parseResponse->soapResponse;
        $soap_result = $resultat_tmp["data"];
        $error_code = explode("<id>", $soap_result);
        $error_code = explode("</id>", $error_code[1]);
        //+ Error handling and label saving
        if ($error_code[0] == "0") {
            //+ Write result to file <parcel number>.extension in defined folder (ex: ./labels/6A12091920617.zpl) 
            $resultat_tmp = $parseResponse->soapResponse;
            $soap_result = $resultat_tmp["data"];
            $resultat_tmp = $parseResponse->attachments;
            $label_content = $resultat_tmp[0];
            $my_datas = $label_content["data"];
            //Save the label 
            $my_extension_tmp = $requestParameter["outputFormat"]["outputPrintingType"];
            $my_extension = strtolower(substr($my_extension_tmp, 0, 3));
            $pieces = explode("<parcelNumber>", $soap_result);
            $pieces = explode("</parcelNumber>", $pieces[1]);
            $parcelNumber = $pieces[0]; //Extract the parcel number 
            $my_file_name = LABEL_FOLDER . $order->ref . "." . $my_extension;
            $my_file = fopen($my_file_name, 'a');

            if (fputs($my_file, $my_datas)) { //Save the label in defined folder 
                fclose($my_file);
                $order->tracking_number = $parcelNumber;
                $order->tracking_url = "https://www.laposte.fr/outils/suivre-vos-envois?code=" . $parcelNumber;
                $order->weight = $request->post("weight");
                $order->shipping_company = "Colissimo";
                $order->generate_label = true;
                $order->save();
                echo "generation d'étiquette avec succès";
            } else {
                throw new PickbazarException('erreur ecriture etiquette');
            }
        } else { //Display errors if exist
            $error_message = explode("<messageContent>", $soap_result);
            $error_message = explode("</messageContent>", $error_message[1]);
            throw new PickbazarException($error_message[0], $error_code[0]);
        }
    }
    public function  generateLabel($id, Request $request)
    {

        $my_file_name = LABEL_FOLDER . $request->ref . "." . "pdf";
        $my_file = fopen($my_file_name, 'a');
   
      /*  $delivery = Delivery::find($id);
        if (!$delivery) {
            return null;
        }
        $delivery->tracking_number = "demo-ref".$delivery->id;
        $delivery->tracking_url = "https://www.laposte.fr/outils/suivre-vos-envois?code=";
        $delivery->weight = $request->post("weight");
        $delivery->company = "Colissimo";
        $delivery->label_pdf=env("APP_URL").$my_file_name;

        $delivery->save();
        return 200;*/

        //   return $order;
        $requestParameter = array(
            'contractNumber' => '391546',
            'password' => 'Cucu3434@',
            'outputFormat' => array('outputPrintingType' => 'PDF_10x15_300dpi'),
            'letter' => array(
                'service' => array(
                    'productCode' => 'DOM',
                    'depositDate' => Carbon::now()->format("Y-m-d")
                ),
                'parcel' => array('weight' => $request->post("weight")),
                'sender' => array(
                    'address' => array(
                        'companyName' => 'CLICK GAMES', 'line2' => '8 RUE LOUIS ARAGON', 'countryCode' => 'FR', 'city' => 'Audincourt', 'zipCode' => '25400'
                    )
                ),
                'addressee' => array(
                    'address' => array(
                        'lastName' => $delivery->receiver->first_name, 'firstName' => $delivery->receiver->last_name, 'line2' =>  $delivery->receiver->address['street_address'], 'countryCode' => 'FR', 'city' => $delivery->receiver->address['city'], 'zipCode' => $delivery->receiver->address['zip'],
                        'mobileNumber' => $delivery->receiver->telephone
                    )
                ),

            )
        );
        //   return $requestParameter;

        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" />');
        $xml->addChild("soapenv:Header");
        $children = $xml->addChild("soapenv:Body");
        $children = $children->addChild("sls:checkGenerateLabel", null, 'http://sls.ws.coliposte.fr');
        $children = $children->addChild("checkGenerateLabelRequest", null, "");
        $this->array_to_xml($requestParameter, $children);
        $requestSoap = $xml->asXML();
        $resp = new SoapClient(SERVER_NAME . '/sls-ws/SlsServiceWS?wsdl');
        $response = $resp->__doRequest($requestSoap, SERVER_NAME . '/sls-ws/SlsServiceWS', 'checkGenerateLabel', '2.0', 0);
        //+ Parse Web Service Response 


        $parseResponse = new MTOM_ResponseReader($response);
        $resultat_tmp = $parseResponse->soapResponse;
        $soap_result = $resultat_tmp["data"];
        $error_code = explode("<id>", $soap_result);
        $error_code = explode("</id>", $error_code[1]);
        //+ Error handling and label saving
        if ($error_code[0] == "0") {
            //+ Write result to file <parcel number>.extension in defined folder (ex: ./labels/6A12091920617.zpl) 
            $resultat_tmp = $parseResponse->soapResponse;
            $soap_result = $resultat_tmp["data"];
            $resultat_tmp = $parseResponse->attachments;
            $label_content = $resultat_tmp[0];
            $my_datas = $label_content["data"];
            //Save the label 
            $my_extension_tmp = $requestParameter["outputFormat"]["outputPrintingType"];
            $my_extension = strtolower(substr($my_extension_tmp, 0, 3));
            $pieces = explode("<parcelNumber>", $soap_result);
            $pieces = explode("</parcelNumber>", $pieces[1]);
            $parcelNumber = $pieces[0]; //Extract the parcel number 
            $my_file_name = LABEL_FOLDER . $request->ref . "." . $my_extension;
            $my_file = fopen($my_file_name, 'a');

            if (fputs($my_file, $my_datas)) { //Save the label in defined folder 
                fclose($my_file);
                $delivery->tracking_number = $parcelNumber;
                $delivery->tracking_url = "https://www.laposte.fr/outils/suivre-vos-envois?code=" . $parcelNumber;
                $delivery->weight = $request->post("weight");
                $delivery->shipping_company = "Colissimo";

                $delivery->save();
                echo "generation d'étiquette avec succès";
            } else {
                throw new PickbazarException('erreur ecriture etiquette');
            }
        } else { //Display errors if exist
            $error_message = explode("<messageContent>", $soap_result);
            $error_message = explode("</messageContent>", $error_message[1]);
            throw new PickbazarException($error_message[0], $error_code[0]);
        }
    }


    /** * Convert array to Xml *
     *  @param unknown $soapRequest *
     *  @param unknown $soapRequestXml */
    function array_to_xml($soapRequest, $soapRequestXml)
    {
        foreach ($soapRequest as $key => $value) {
            if (is_array($value)) {
                if (!is_numeric($key)) {
                    $subnode = $soapRequestXml->addChild("$key");
                    $this->array_to_xml($value, $subnode);
                } else {
                    $subnode = $soapRequestXml->addChild("item$key");
                    $this->array_to_xml($value, $subnode);
                }
            } else {
                $soapRequestXml->addChild("$key", htmlspecialchars("$value"));
            }
        }
    }
}
