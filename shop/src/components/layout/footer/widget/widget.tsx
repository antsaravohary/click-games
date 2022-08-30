import Container from '@components/ui/container';
import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import WidgetSubscription from './widget-subscription';
import { footer } from '../data';

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { social } = footer;
  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 ">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-3 border-b sm:border-b-0 border-skin-three mb-4 sm:mb-0"
        />
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
          />
        ))}

        {/** <WidgetSubscription className="col-span-full sm:col-span-1 md:col-start-4 xl:col-start-auto md:col-span-5 xl:col-span-3 2xl:ps-7 3xl:ps-16 pt-8 sm:pt-0 border-t sm:border-t-0 border-skin-three " />
       */}
       </div>
      <p className='text-left text-xs mt-2 max-w-md'>
        Les noms des produits présentés sur ce site sont utilisés à des fins d'identification uniquement.
        Toutes les marques commerciales et marques déposées appartiennent à leurs propriétaires respectifs.</p>
      <div className='d-flex justify-content-center'>
        <img className="mt-2" style={{ width: '200px' }} src='/logo/logo-stripe.png' />
      </div>
    </Container>
  );
};

export default Widgets;
