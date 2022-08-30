import { useForm } from 'react-hook-form';
import Input from '@components/ui/input';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { EmailIcon } from '@components/icons/sidebar';
import SendIcon from '@components/icons/icons/send-icon';
import { useIsRTL } from '@utils/locals';
interface Props {
  className?: string;
}
interface NewsLetterFormValues {
  email: string;
}
const defaultValues = {
  email: '',
};
const WidgetSubscription: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  function onSubmit(values: NewsLetterFormValues) {
    console.log(values, 'News letter');
  }
  const { locale } = useRouter();
  const dir = useIsRTL();
  return (
    <div className={cn('flex flex-col', className)}>
      <Heading variant="mediumHeading" className="mb-4 lg:mb-6 lg:pb-0.5">
        {t('widget-title-subscribe')}
      </Heading>

      <Text className="lg:-mt-1 max-w-[400px]">
        {t('text-subscribe')}
      </Text>
      <form
        className="relative mt-5 max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="flex items-center absolute start-0 top-0 h-12 px-3.5 transform">
          <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
        </span>
        <Input
          placeholder={t('placeholder-email-subscribe')}
          type="email"
          id="subscription-email"
          variant="solid"
          className="w-full"
          inputClassName="ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 rounded-md"
          {...register('email', {
            required: `${t('forms:email-required')}`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: `${t('forms:email-error')}`,
            },
          })}
          error={errors.email?.message}
        />
        <button
          className="absolute end-0 top-0 hover:opacity-80 focus:outline-none h-12 px-3 lg:px-3.5 transform scale-90 2xl:scale-100"
          aria-label="Subscribe Button"
        >
          <SendIcon
            className={`w-[18px] 2xl:w-5 h-[18px] 2xl:h-5 ${dir === 'rtl' && 'transform rotate-180'
              }`}
          />
        </button>
      </form>
    </div>
  );
};

export default WidgetSubscription;
