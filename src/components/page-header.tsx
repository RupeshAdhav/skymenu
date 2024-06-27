
export default function PageHeader(props: any) {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <div className="text-center">
              <span className="text-2xl leading-6 text-blue-500">
                  sky
              </span>
              <span className="text-2xl font-light leading-6 text-gray-900">
                  menu
              </span>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {props.header}
          </h2>
        </div>
    );
}