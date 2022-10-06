<?php

namespace App\Utility;

use App\Models\SherlockTransaction;
use Exception;

class Sherlocks
{

    private $secretKey;
    private $merchantId;

    public function __construct()
    {
        $this->secretKey = "rxSP61eeP_oNi5TxCD7Ngy9YcwC8MLw6OlmFGGcsY54";
        $this->merchantId = "201040040170001";
    }

    public function cardOrder($data, $user_id)
    {
        $t = new SherlockTransaction();
        $t->method = "cardOrder";
        $t->status = "pending";
        $t->user_id = $user_id;
        $t->save();
        $data["transactionReference"] = $t->id;
        $data["merchantId"] = $this->merchantId;
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        $t->data = $data;
        $t->response = $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/checkout/cardOrder");
        $t->status = "terminate";
        $t->save();
        return $t;
    }

    public function addCard($data, $user_id)
    {
        $t = new SherlockTransaction();
        $t->method = "addCard";
        $data["merchantId"] = $this->merchantId;
        $t->status = "pending";
        $t->user_id = $user_id;
        $t->save();
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        $t->data = $data;
        $t->response = $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/wallet/addCard");
        $t->status = "terminate";
        $t->save();
        return $t;
    }
    public function cardCheckEnrollment($data, $user)
    {
        $t = new SherlockTransaction();
        $t->method = "cardCheckEnrollment";
        $t->status = "pending";
        $t->user_id = $user->id;
        $t->save();
        $data["transactionReference"] = $t->id;
        $data["merchantId"] = $this->merchantId;
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        $t->data = $data;
        $t->response = $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/checkout/cardCheckEnrollment");
        $t->status = "terminate";
        $t->save();
        return $t;
    }

    public function cardValidateAuthenticationAndOrder($data, $user_id, $ref)
    {
        $t = new SherlockTransaction();
        $t->method = "cardValidateAuthenticationAndOrder";
        $t->status = "pending";
        $t->user_id = $user_id;
        $t->save();
        $data["transactionReference"] = $ref;
        $data["merchantId"] = $this->merchantId;
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        $t->data = $data;
        $t->response = $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/checkout/cardValidateAuthenticationAndOrder");
        $t->status = "terminate";
        $t->save();
        return $t;
    }

    public function walletOrder($data, $time, $user_id)
    {

        $t = new SherlockTransaction();
        $t->method = "walletOrder";
        $t->status = "pending";
        $t->user_id = $user_id;
        $t->save();
        $data["merchantId"] = $this->merchantId;
        $data["transactionReference"] = $t->id;
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        $t->data = $data;
        $t->response= $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/checkout/walletOrder");
        $t->save();
        return $t;
    }
    public function test($data)
    {
        $data["merchantId"] = $this->merchantId;
        ksort($data);
        $dataStr = $this->flatten_to_sips_payload($data);
        $seal = $this->compute_seal('HMAC-SHA-256', $dataStr, $this->secretKey);
        $data["keyVersion"] = "1";
        $data["seal"] = $seal;
        return $this->send($data, "https://office-server-sherlocks.test.sips-services.com/rs-services/v2/checkout/cardOrder");

       
    }
    function compute_seal_from_string($sealAlgorithm, $data, $secretKey)
    {
        if (strcmp($sealAlgorithm, "HMAC-SHA-256") == 0) {
            $hmac256 = true;
        } elseif (empty($sealAlgorithm)) {
            $hmac256 = false;
        } else {
            $hmac256 = false;
        }
        return $this->compute_seal($hmac256, $data, $secretKey);
    }

    function compute_seal($hmac256, $data, $secretKey)
    {
        $serverEncoding = mb_internal_encoding();

        if (strcmp($serverEncoding, "UTF-8") == 0) {
            $dataUtf8 = $data;
            $secretKeyUtf8 = $secretKey;
        } else {
            $dataUtf8 = iconv($serverEncoding, "UTF-8", $data);
            $secretKeyUtf8 = iconv($serverEncoding, "UTF-8", $secretKey);
        }
        if ($hmac256) {
            $seal = hash_hmac('sha256', $data, $secretKey);
        } else {
            $seal = hash('sha256',  $data . $secretKey);
        }
        return $seal;
    }
    function flatten_to_sips_payload($input)
    {
        $keyStack = array();
        return implode("", $this->flatten_undefined($input, $keyStack));
    }

    // utility method called by flatten_to_sips_payload and flatten_array
    // returns a single dimensional array that can be imploded as a string with the
    // required separator
    function flatten_undefined($object, $keyStack)
    {
        $result = array();
        if (is_array($object)) {
            $result = array_merge($result, $this->flatten_array($object, $keyStack));
        } else if (!empty($keyStack)) {
            $result[] = $object;
        } else {
            $result[] = $object;
        }
        return $result;
    }

    // utility method called by flatten_undefined or by itself
    // returns a single dimensional array representing this array
    function flatten_array($array, $keyStack)
    {
        $simpleValues = array();
        $result = array();

        foreach ($array as $key => $value) {
            if (is_int($key)) {
                // Values without keys are added to results after ones having keys
                if (is_array($value)) {
                    $noKeyStack = array();
                    $simpleValues = array_merge($simpleValues, $this->flatten_array($value, $noKeyStack));
                } else {
                    $simpleValues[] = $value;
                }
            } else {
                $keyStack[] = $key;
                $result = array_merge($result, $this->flatten_undefined($value, $keyStack));
                array_pop($keyStack);
            }
        }

        if (!empty($simpleValues)) {
            if (empty($keyStack)) {
                $result = array_merge($result, $simpleValues);
            } else {
                $result[] = implode(".", $keyStack) . '=' . implode(",", $simpleValues);
            }
        }
        return $result;
    }

    function send($data, $url)
    {
        $response = "";
        $ch = curl_init();
        try {
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                echo curl_error($ch);
                die();
            }
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($http_code == intval(200)) {
                $response =  $response;
            } else {
                $response = $response;
            }
        } catch (\Throwable $th) {
            throw $th;
        } finally {

            curl_close($ch);
            return (json_decode($response, true));
        }
    }
}
